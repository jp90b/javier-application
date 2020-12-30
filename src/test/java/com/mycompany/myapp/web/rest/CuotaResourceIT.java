package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.Prueb0AsociadosApp;
import com.mycompany.myapp.domain.Cuota;
import com.mycompany.myapp.repository.CuotaRepository;
import com.mycompany.myapp.repository.search.CuotaSearchRepository;
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
 * Integration tests for the {@link CuotaResource} REST controller.
 */
@SpringBootTest(classes = Prueb0AsociadosApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CuotaResourceIT {
    private static final Boolean DEFAULT_ABONO_2019 = false;
    private static final Boolean UPDATED_ABONO_2019 = true;

    private static final BigDecimal DEFAULT_ABONO_2019_Q = new BigDecimal(1);
    private static final BigDecimal UPDATED_ABONO_2019_Q = new BigDecimal(2);

    private static final Instant DEFAULT_FECHA_2019_Q = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_2019_Q = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ABONO_2020 = false;
    private static final Boolean UPDATED_ABONO_2020 = true;

    private static final BigDecimal DEFAULT_ABONO_2020_Q = new BigDecimal(1);
    private static final BigDecimal UPDATED_ABONO_2020_Q = new BigDecimal(2);

    private static final Instant DEFAULT_FECHA_2020_Q = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_2020_Q = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CuotaRepository cuotaRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.CuotaSearchRepositoryMockConfiguration
     */
    @Autowired
    private CuotaSearchRepository mockCuotaSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCuotaMockMvc;

    private Cuota cuota;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cuota createEntity(EntityManager em) {
        Cuota cuota = new Cuota()
            .abono2019(DEFAULT_ABONO_2019)
            .abono2019Q(DEFAULT_ABONO_2019_Q)
            .fecha2019Q(DEFAULT_FECHA_2019_Q)
            .abono2020(DEFAULT_ABONO_2020)
            .abono2020Q(DEFAULT_ABONO_2020_Q)
            .fecha2020Q(DEFAULT_FECHA_2020_Q);
        return cuota;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cuota createUpdatedEntity(EntityManager em) {
        Cuota cuota = new Cuota()
            .abono2019(UPDATED_ABONO_2019)
            .abono2019Q(UPDATED_ABONO_2019_Q)
            .fecha2019Q(UPDATED_FECHA_2019_Q)
            .abono2020(UPDATED_ABONO_2020)
            .abono2020Q(UPDATED_ABONO_2020_Q)
            .fecha2020Q(UPDATED_FECHA_2020_Q);
        return cuota;
    }

    @BeforeEach
    public void initTest() {
        cuota = createEntity(em);
    }

    @Test
    @Transactional
    public void createCuota() throws Exception {
        int databaseSizeBeforeCreate = cuotaRepository.findAll().size();
        // Create the Cuota
        restCuotaMockMvc
            .perform(post("/api/cuotas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cuota)))
            .andExpect(status().isCreated());

        // Validate the Cuota in the database
        List<Cuota> cuotaList = cuotaRepository.findAll();
        assertThat(cuotaList).hasSize(databaseSizeBeforeCreate + 1);
        Cuota testCuota = cuotaList.get(cuotaList.size() - 1);
        assertThat(testCuota.isAbono2019()).isEqualTo(DEFAULT_ABONO_2019);
        assertThat(testCuota.getAbono2019Q()).isEqualTo(DEFAULT_ABONO_2019_Q);
        assertThat(testCuota.getFecha2019Q()).isEqualTo(DEFAULT_FECHA_2019_Q);
        assertThat(testCuota.isAbono2020()).isEqualTo(DEFAULT_ABONO_2020);
        assertThat(testCuota.getAbono2020Q()).isEqualTo(DEFAULT_ABONO_2020_Q);
        assertThat(testCuota.getFecha2020Q()).isEqualTo(DEFAULT_FECHA_2020_Q);

        // Validate the Cuota in Elasticsearch
        verify(mockCuotaSearchRepository, times(1)).save(testCuota);
    }

    @Test
    @Transactional
    public void createCuotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cuotaRepository.findAll().size();

        // Create the Cuota with an existing ID
        cuota.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCuotaMockMvc
            .perform(post("/api/cuotas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cuota)))
            .andExpect(status().isBadRequest());

        // Validate the Cuota in the database
        List<Cuota> cuotaList = cuotaRepository.findAll();
        assertThat(cuotaList).hasSize(databaseSizeBeforeCreate);

        // Validate the Cuota in Elasticsearch
        verify(mockCuotaSearchRepository, times(0)).save(cuota);
    }

    @Test
    @Transactional
    public void getAllCuotas() throws Exception {
        // Initialize the database
        cuotaRepository.saveAndFlush(cuota);

        // Get all the cuotaList
        restCuotaMockMvc
            .perform(get("/api/cuotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cuota.getId().intValue())))
            .andExpect(jsonPath("$.[*].abono2019").value(hasItem(DEFAULT_ABONO_2019.booleanValue())))
            .andExpect(jsonPath("$.[*].abono2019Q").value(hasItem(DEFAULT_ABONO_2019_Q.intValue())))
            .andExpect(jsonPath("$.[*].fecha2019Q").value(hasItem(DEFAULT_FECHA_2019_Q.toString())))
            .andExpect(jsonPath("$.[*].abono2020").value(hasItem(DEFAULT_ABONO_2020.booleanValue())))
            .andExpect(jsonPath("$.[*].abono2020Q").value(hasItem(DEFAULT_ABONO_2020_Q.intValue())))
            .andExpect(jsonPath("$.[*].fecha2020Q").value(hasItem(DEFAULT_FECHA_2020_Q.toString())));
    }

    @Test
    @Transactional
    public void getCuota() throws Exception {
        // Initialize the database
        cuotaRepository.saveAndFlush(cuota);

        // Get the cuota
        restCuotaMockMvc
            .perform(get("/api/cuotas/{id}", cuota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cuota.getId().intValue()))
            .andExpect(jsonPath("$.abono2019").value(DEFAULT_ABONO_2019.booleanValue()))
            .andExpect(jsonPath("$.abono2019Q").value(DEFAULT_ABONO_2019_Q.intValue()))
            .andExpect(jsonPath("$.fecha2019Q").value(DEFAULT_FECHA_2019_Q.toString()))
            .andExpect(jsonPath("$.abono2020").value(DEFAULT_ABONO_2020.booleanValue()))
            .andExpect(jsonPath("$.abono2020Q").value(DEFAULT_ABONO_2020_Q.intValue()))
            .andExpect(jsonPath("$.fecha2020Q").value(DEFAULT_FECHA_2020_Q.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCuota() throws Exception {
        // Get the cuota
        restCuotaMockMvc.perform(get("/api/cuotas/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCuota() throws Exception {
        // Initialize the database
        cuotaRepository.saveAndFlush(cuota);

        int databaseSizeBeforeUpdate = cuotaRepository.findAll().size();

        // Update the cuota
        Cuota updatedCuota = cuotaRepository.findById(cuota.getId()).get();
        // Disconnect from session so that the updates on updatedCuota are not directly saved in db
        em.detach(updatedCuota);
        updatedCuota
            .abono2019(UPDATED_ABONO_2019)
            .abono2019Q(UPDATED_ABONO_2019_Q)
            .fecha2019Q(UPDATED_FECHA_2019_Q)
            .abono2020(UPDATED_ABONO_2020)
            .abono2020Q(UPDATED_ABONO_2020_Q)
            .fecha2020Q(UPDATED_FECHA_2020_Q);

        restCuotaMockMvc
            .perform(put("/api/cuotas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedCuota)))
            .andExpect(status().isOk());

        // Validate the Cuota in the database
        List<Cuota> cuotaList = cuotaRepository.findAll();
        assertThat(cuotaList).hasSize(databaseSizeBeforeUpdate);
        Cuota testCuota = cuotaList.get(cuotaList.size() - 1);
        assertThat(testCuota.isAbono2019()).isEqualTo(UPDATED_ABONO_2019);
        assertThat(testCuota.getAbono2019Q()).isEqualTo(UPDATED_ABONO_2019_Q);
        assertThat(testCuota.getFecha2019Q()).isEqualTo(UPDATED_FECHA_2019_Q);
        assertThat(testCuota.isAbono2020()).isEqualTo(UPDATED_ABONO_2020);
        assertThat(testCuota.getAbono2020Q()).isEqualTo(UPDATED_ABONO_2020_Q);
        assertThat(testCuota.getFecha2020Q()).isEqualTo(UPDATED_FECHA_2020_Q);

        // Validate the Cuota in Elasticsearch
        verify(mockCuotaSearchRepository, times(1)).save(testCuota);
    }

    @Test
    @Transactional
    public void updateNonExistingCuota() throws Exception {
        int databaseSizeBeforeUpdate = cuotaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCuotaMockMvc
            .perform(put("/api/cuotas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cuota)))
            .andExpect(status().isBadRequest());

        // Validate the Cuota in the database
        List<Cuota> cuotaList = cuotaRepository.findAll();
        assertThat(cuotaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Cuota in Elasticsearch
        verify(mockCuotaSearchRepository, times(0)).save(cuota);
    }

    @Test
    @Transactional
    public void deleteCuota() throws Exception {
        // Initialize the database
        cuotaRepository.saveAndFlush(cuota);

        int databaseSizeBeforeDelete = cuotaRepository.findAll().size();

        // Delete the cuota
        restCuotaMockMvc
            .perform(delete("/api/cuotas/{id}", cuota.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cuota> cuotaList = cuotaRepository.findAll();
        assertThat(cuotaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Cuota in Elasticsearch
        verify(mockCuotaSearchRepository, times(1)).deleteById(cuota.getId());
    }

    @Test
    @Transactional
    public void searchCuota() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        cuotaRepository.saveAndFlush(cuota);
        when(mockCuotaSearchRepository.search(queryStringQuery("id:" + cuota.getId()))).thenReturn(Collections.singletonList(cuota));

        // Search the cuota
        restCuotaMockMvc
            .perform(get("/api/_search/cuotas?query=id:" + cuota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cuota.getId().intValue())))
            .andExpect(jsonPath("$.[*].abono2019").value(hasItem(DEFAULT_ABONO_2019.booleanValue())))
            .andExpect(jsonPath("$.[*].abono2019Q").value(hasItem(DEFAULT_ABONO_2019_Q.intValue())))
            .andExpect(jsonPath("$.[*].fecha2019Q").value(hasItem(DEFAULT_FECHA_2019_Q.toString())))
            .andExpect(jsonPath("$.[*].abono2020").value(hasItem(DEFAULT_ABONO_2020.booleanValue())))
            .andExpect(jsonPath("$.[*].abono2020Q").value(hasItem(DEFAULT_ABONO_2020_Q.intValue())))
            .andExpect(jsonPath("$.[*].fecha2020Q").value(hasItem(DEFAULT_FECHA_2020_Q.toString())));
    }
}
