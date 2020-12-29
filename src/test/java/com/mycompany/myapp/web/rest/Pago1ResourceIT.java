package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.Prueb0AsociadosApp;
import com.mycompany.myapp.domain.Pago1;
import com.mycompany.myapp.repository.Pago1Repository;
import com.mycompany.myapp.repository.search.Pago1SearchRepository;
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
 * Integration tests for the {@link Pago1Resource} REST controller.
 */
@SpringBootTest(classes = Prueb0AsociadosApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class Pago1ResourceIT {
    private static final BigDecimal DEFAULT_CANTIDAD_1 = new BigDecimal(1);
    private static final BigDecimal UPDATED_CANTIDAD_1 = new BigDecimal(2);

    private static final Instant DEFAULT_FECHA_1 = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_1 = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private Pago1Repository pago1Repository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.Pago1SearchRepositoryMockConfiguration
     */
    @Autowired
    private Pago1SearchRepository mockPago1SearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPago1MockMvc;

    private Pago1 pago1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pago1 createEntity(EntityManager em) {
        Pago1 pago1 = new Pago1().cantidad1(DEFAULT_CANTIDAD_1).fecha1(DEFAULT_FECHA_1);
        return pago1;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pago1 createUpdatedEntity(EntityManager em) {
        Pago1 pago1 = new Pago1().cantidad1(UPDATED_CANTIDAD_1).fecha1(UPDATED_FECHA_1);
        return pago1;
    }

    @BeforeEach
    public void initTest() {
        pago1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createPago1() throws Exception {
        int databaseSizeBeforeCreate = pago1Repository.findAll().size();
        // Create the Pago1
        restPago1MockMvc
            .perform(post("/api/pago-1-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pago1)))
            .andExpect(status().isCreated());

        // Validate the Pago1 in the database
        List<Pago1> pago1List = pago1Repository.findAll();
        assertThat(pago1List).hasSize(databaseSizeBeforeCreate + 1);
        Pago1 testPago1 = pago1List.get(pago1List.size() - 1);
        assertThat(testPago1.getCantidad1()).isEqualTo(DEFAULT_CANTIDAD_1);
        assertThat(testPago1.getFecha1()).isEqualTo(DEFAULT_FECHA_1);

        // Validate the Pago1 in Elasticsearch
        verify(mockPago1SearchRepository, times(1)).save(testPago1);
    }

    @Test
    @Transactional
    public void createPago1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pago1Repository.findAll().size();

        // Create the Pago1 with an existing ID
        pago1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPago1MockMvc
            .perform(post("/api/pago-1-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pago1)))
            .andExpect(status().isBadRequest());

        // Validate the Pago1 in the database
        List<Pago1> pago1List = pago1Repository.findAll();
        assertThat(pago1List).hasSize(databaseSizeBeforeCreate);

        // Validate the Pago1 in Elasticsearch
        verify(mockPago1SearchRepository, times(0)).save(pago1);
    }

    @Test
    @Transactional
    public void getAllPago1s() throws Exception {
        // Initialize the database
        pago1Repository.saveAndFlush(pago1);

        // Get all the pago1List
        restPago1MockMvc
            .perform(get("/api/pago-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pago1.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad1").value(hasItem(DEFAULT_CANTIDAD_1.intValue())))
            .andExpect(jsonPath("$.[*].fecha1").value(hasItem(DEFAULT_FECHA_1.toString())));
    }

    @Test
    @Transactional
    public void getPago1() throws Exception {
        // Initialize the database
        pago1Repository.saveAndFlush(pago1);

        // Get the pago1
        restPago1MockMvc
            .perform(get("/api/pago-1-s/{id}", pago1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pago1.getId().intValue()))
            .andExpect(jsonPath("$.cantidad1").value(DEFAULT_CANTIDAD_1.intValue()))
            .andExpect(jsonPath("$.fecha1").value(DEFAULT_FECHA_1.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPago1() throws Exception {
        // Get the pago1
        restPago1MockMvc.perform(get("/api/pago-1-s/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePago1() throws Exception {
        // Initialize the database
        pago1Repository.saveAndFlush(pago1);

        int databaseSizeBeforeUpdate = pago1Repository.findAll().size();

        // Update the pago1
        Pago1 updatedPago1 = pago1Repository.findById(pago1.getId()).get();
        // Disconnect from session so that the updates on updatedPago1 are not directly saved in db
        em.detach(updatedPago1);
        updatedPago1.cantidad1(UPDATED_CANTIDAD_1).fecha1(UPDATED_FECHA_1);

        restPago1MockMvc
            .perform(put("/api/pago-1-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedPago1)))
            .andExpect(status().isOk());

        // Validate the Pago1 in the database
        List<Pago1> pago1List = pago1Repository.findAll();
        assertThat(pago1List).hasSize(databaseSizeBeforeUpdate);
        Pago1 testPago1 = pago1List.get(pago1List.size() - 1);
        assertThat(testPago1.getCantidad1()).isEqualTo(UPDATED_CANTIDAD_1);
        assertThat(testPago1.getFecha1()).isEqualTo(UPDATED_FECHA_1);

        // Validate the Pago1 in Elasticsearch
        verify(mockPago1SearchRepository, times(1)).save(testPago1);
    }

    @Test
    @Transactional
    public void updateNonExistingPago1() throws Exception {
        int databaseSizeBeforeUpdate = pago1Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPago1MockMvc
            .perform(put("/api/pago-1-s").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pago1)))
            .andExpect(status().isBadRequest());

        // Validate the Pago1 in the database
        List<Pago1> pago1List = pago1Repository.findAll();
        assertThat(pago1List).hasSize(databaseSizeBeforeUpdate);

        // Validate the Pago1 in Elasticsearch
        verify(mockPago1SearchRepository, times(0)).save(pago1);
    }

    @Test
    @Transactional
    public void deletePago1() throws Exception {
        // Initialize the database
        pago1Repository.saveAndFlush(pago1);

        int databaseSizeBeforeDelete = pago1Repository.findAll().size();

        // Delete the pago1
        restPago1MockMvc
            .perform(delete("/api/pago-1-s/{id}", pago1.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pago1> pago1List = pago1Repository.findAll();
        assertThat(pago1List).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Pago1 in Elasticsearch
        verify(mockPago1SearchRepository, times(1)).deleteById(pago1.getId());
    }

    @Test
    @Transactional
    public void searchPago1() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        pago1Repository.saveAndFlush(pago1);
        when(mockPago1SearchRepository.search(queryStringQuery("id:" + pago1.getId()))).thenReturn(Collections.singletonList(pago1));

        // Search the pago1
        restPago1MockMvc
            .perform(get("/api/_search/pago-1-s?query=id:" + pago1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pago1.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad1").value(hasItem(DEFAULT_CANTIDAD_1.intValue())))
            .andExpect(jsonPath("$.[*].fecha1").value(hasItem(DEFAULT_FECHA_1.toString())));
    }
}
