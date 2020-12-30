package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.Prueb0AsociadosApp;
import com.mycompany.myapp.domain.Pago2;
import com.mycompany.myapp.repository.Pago2Repository;
import com.mycompany.myapp.repository.search.Pago2SearchRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link Pago2Resource} REST controller.
 */
@SpringBootTest(classes = Prueb0AsociadosApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class Pago2ResourceIT {
    private static final BigDecimal DEFAULT_CANTIDAD_2 = new BigDecimal(1);
    private static final BigDecimal UPDATED_CANTIDAD_2 = new BigDecimal(2);

    private static final Instant DEFAULT_FECHA_2 = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_2 = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private Pago2Repository pago2Repository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.Pago2SearchRepositoryMockConfiguration
     */
    @Autowired
    private Pago2SearchRepository mockPago2SearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPago2MockMvc;

    private Pago2 pago2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pago2 createEntity(EntityManager em) {
        Pago2 pago2 = new Pago2().cantidad2(DEFAULT_CANTIDAD_2).fecha2(DEFAULT_FECHA_2);
        return pago2;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pago2 createUpdatedEntity(EntityManager em) {
        Pago2 pago2 = new Pago2().cantidad2(UPDATED_CANTIDAD_2).fecha2(UPDATED_FECHA_2);
        return pago2;
    }

    @BeforeEach
    public void initTest() {
        pago2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createPago2() throws Exception {
        int databaseSizeBeforeCreate = pago2Repository.findAll().size();
        // Create the Pago2
        restPago2MockMvc
            .perform(post("/api/pago-2-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pago2)))
            .andExpect(status().isCreated());

        // Validate the Pago2 in the database
        List<Pago2> pago2List = pago2Repository.findAll();
        assertThat(pago2List).hasSize(databaseSizeBeforeCreate + 1);
        Pago2 testPago2 = pago2List.get(pago2List.size() - 1);
        assertThat(testPago2.getCantidad2()).isEqualTo(DEFAULT_CANTIDAD_2);
        assertThat(testPago2.getFecha2()).isEqualTo(DEFAULT_FECHA_2);

        // Validate the Pago2 in Elasticsearch
        verify(mockPago2SearchRepository, times(1)).save(testPago2);
    }

    @Test
    @Transactional
    public void createPago2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pago2Repository.findAll().size();

        // Create the Pago2 with an existing ID
        pago2.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPago2MockMvc
            .perform(post("/api/pago-2-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pago2)))
            .andExpect(status().isBadRequest());

        // Validate the Pago2 in the database
        List<Pago2> pago2List = pago2Repository.findAll();
        assertThat(pago2List).hasSize(databaseSizeBeforeCreate);

        // Validate the Pago2 in Elasticsearch
        verify(mockPago2SearchRepository, times(0)).save(pago2);
    }

    @Test
    @Transactional
    public void getAllPago2s() throws Exception {
        // Initialize the database
        pago2Repository.saveAndFlush(pago2);

        // Get all the pago2List
        restPago2MockMvc
            .perform(get("/api/pago-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pago2.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad2").value(hasItem(DEFAULT_CANTIDAD_2.intValue())))
            .andExpect(jsonPath("$.[*].fecha2").value(hasItem(DEFAULT_FECHA_2.toString())));
    }

    @Test
    @Transactional
    public void getPago2() throws Exception {
        // Initialize the database
        pago2Repository.saveAndFlush(pago2);

        // Get the pago2
        restPago2MockMvc
            .perform(get("/api/pago-2-s/{id}", pago2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pago2.getId().intValue()))
            .andExpect(jsonPath("$.cantidad2").value(DEFAULT_CANTIDAD_2.intValue()))
            .andExpect(jsonPath("$.fecha2").value(DEFAULT_FECHA_2.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPago2() throws Exception {
        // Get the pago2
        restPago2MockMvc.perform(get("/api/pago-2-s/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePago2() throws Exception {
        // Initialize the database
        pago2Repository.saveAndFlush(pago2);

        int databaseSizeBeforeUpdate = pago2Repository.findAll().size();

        // Update the pago2
        Pago2 updatedPago2 = pago2Repository.findById(pago2.getId()).get();
        // Disconnect from session so that the updates on updatedPago2 are not directly saved in db
        em.detach(updatedPago2);
        updatedPago2.cantidad2(UPDATED_CANTIDAD_2).fecha2(UPDATED_FECHA_2);

        restPago2MockMvc
            .perform(put("/api/pago-2-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedPago2)))
            .andExpect(status().isOk());

        // Validate the Pago2 in the database
        List<Pago2> pago2List = pago2Repository.findAll();
        assertThat(pago2List).hasSize(databaseSizeBeforeUpdate);
        Pago2 testPago2 = pago2List.get(pago2List.size() - 1);
        assertThat(testPago2.getCantidad2()).isEqualTo(UPDATED_CANTIDAD_2);
        assertThat(testPago2.getFecha2()).isEqualTo(UPDATED_FECHA_2);

        // Validate the Pago2 in Elasticsearch
        verify(mockPago2SearchRepository, times(1)).save(testPago2);
    }

    @Test
    @Transactional
    public void updateNonExistingPago2() throws Exception {
        int databaseSizeBeforeUpdate = pago2Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPago2MockMvc
            .perform(put("/api/pago-2-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pago2)))
            .andExpect(status().isBadRequest());

        // Validate the Pago2 in the database
        List<Pago2> pago2List = pago2Repository.findAll();
        assertThat(pago2List).hasSize(databaseSizeBeforeUpdate);

        // Validate the Pago2 in Elasticsearch
        verify(mockPago2SearchRepository, times(0)).save(pago2);
    }

    @Test
    @Transactional
    public void deletePago2() throws Exception {
        // Initialize the database
        pago2Repository.saveAndFlush(pago2);

        int databaseSizeBeforeDelete = pago2Repository.findAll().size();

        // Delete the pago2
        restPago2MockMvc
            .perform(delete("/api/pago-2-s/{id}", pago2.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pago2> pago2List = pago2Repository.findAll();
        assertThat(pago2List).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Pago2 in Elasticsearch
        verify(mockPago2SearchRepository, times(1)).deleteById(pago2.getId());
    }

    @Test
    @Transactional
    public void searchPago2() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        pago2Repository.saveAndFlush(pago2);
        when(mockPago2SearchRepository.search(queryStringQuery("id:" + pago2.getId()))).thenReturn(Collections.singletonList(pago2));

        // Search the pago2
        restPago2MockMvc
            .perform(get("/api/_search/pago-2-s?query=id:" + pago2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pago2.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad2").value(hasItem(DEFAULT_CANTIDAD_2.intValue())))
            .andExpect(jsonPath("$.[*].fecha2").value(hasItem(DEFAULT_FECHA_2.toString())));
    }
}
