package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.Prueb0AsociadosApp;
import com.mycompany.myapp.domain.Asociado;
import com.mycompany.myapp.repository.AsociadoRepository;
import com.mycompany.myapp.repository.search.AsociadoSearchRepository;
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
 * Integration tests for the {@link AsociadoResource} REST controller.
 */
@SpringBootTest(classes = Prueb0AsociadosApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AsociadoResourceIT {
    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACCIONES = false;
    private static final Boolean UPDATED_ACCIONES = true;

    private static final Boolean DEFAULT_BONOS = false;
    private static final Boolean UPDATED_BONOS = true;

    @Autowired
    private AsociadoRepository asociadoRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.AsociadoSearchRepositoryMockConfiguration
     */
    @Autowired
    private AsociadoSearchRepository mockAsociadoSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAsociadoMockMvc;

    private Asociado asociado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Asociado createEntity(EntityManager em) {
        Asociado asociado = new Asociado()
            .nombre(DEFAULT_NOMBRE)
            .apellidos(DEFAULT_APELLIDOS)
            .email(DEFAULT_EMAIL)
            .acciones(DEFAULT_ACCIONES)
            .bonos(DEFAULT_BONOS);
        return asociado;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Asociado createUpdatedEntity(EntityManager em) {
        Asociado asociado = new Asociado()
            .nombre(UPDATED_NOMBRE)
            .apellidos(UPDATED_APELLIDOS)
            .email(UPDATED_EMAIL)
            .acciones(UPDATED_ACCIONES)
            .bonos(UPDATED_BONOS);
        return asociado;
    }

    @BeforeEach
    public void initTest() {
        asociado = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsociado() throws Exception {
        int databaseSizeBeforeCreate = asociadoRepository.findAll().size();
        // Create the Asociado
        restAsociadoMockMvc
            .perform(post("/api/asociados").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isCreated());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeCreate + 1);
        Asociado testAsociado = asociadoList.get(asociadoList.size() - 1);
        assertThat(testAsociado.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAsociado.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
        assertThat(testAsociado.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAsociado.isAcciones()).isEqualTo(DEFAULT_ACCIONES);
        assertThat(testAsociado.isBonos()).isEqualTo(DEFAULT_BONOS);

        // Validate the Asociado in Elasticsearch
        verify(mockAsociadoSearchRepository, times(1)).save(testAsociado);
    }

    @Test
    @Transactional
    public void createAsociadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asociadoRepository.findAll().size();

        // Create the Asociado with an existing ID
        asociado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsociadoMockMvc
            .perform(post("/api/asociados").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isBadRequest());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeCreate);

        // Validate the Asociado in Elasticsearch
        verify(mockAsociadoSearchRepository, times(0)).save(asociado);
    }

    @Test
    @Transactional
    public void getAllAsociados() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        // Get all the asociadoList
        restAsociadoMockMvc
            .perform(get("/api/asociados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].acciones").value(hasItem(DEFAULT_ACCIONES.booleanValue())))
            .andExpect(jsonPath("$.[*].bonos").value(hasItem(DEFAULT_BONOS.booleanValue())));
    }

    @Test
    @Transactional
    public void getAsociado() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        // Get the asociado
        restAsociadoMockMvc
            .perform(get("/api/asociados/{id}", asociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(asociado.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.acciones").value(DEFAULT_ACCIONES.booleanValue()))
            .andExpect(jsonPath("$.bonos").value(DEFAULT_BONOS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAsociado() throws Exception {
        // Get the asociado
        restAsociadoMockMvc.perform(get("/api/asociados/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsociado() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        int databaseSizeBeforeUpdate = asociadoRepository.findAll().size();

        // Update the asociado
        Asociado updatedAsociado = asociadoRepository.findById(asociado.getId()).get();
        // Disconnect from session so that the updates on updatedAsociado are not directly saved in db
        em.detach(updatedAsociado);
        updatedAsociado
            .nombre(UPDATED_NOMBRE)
            .apellidos(UPDATED_APELLIDOS)
            .email(UPDATED_EMAIL)
            .acciones(UPDATED_ACCIONES)
            .bonos(UPDATED_BONOS);

        restAsociadoMockMvc
            .perform(
                put("/api/asociados").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedAsociado))
            )
            .andExpect(status().isOk());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeUpdate);
        Asociado testAsociado = asociadoList.get(asociadoList.size() - 1);
        assertThat(testAsociado.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAsociado.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
        assertThat(testAsociado.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAsociado.isAcciones()).isEqualTo(UPDATED_ACCIONES);
        assertThat(testAsociado.isBonos()).isEqualTo(UPDATED_BONOS);

        // Validate the Asociado in Elasticsearch
        verify(mockAsociadoSearchRepository, times(1)).save(testAsociado);
    }

    @Test
    @Transactional
    public void updateNonExistingAsociado() throws Exception {
        int databaseSizeBeforeUpdate = asociadoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsociadoMockMvc
            .perform(put("/api/asociados").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(asociado)))
            .andExpect(status().isBadRequest());

        // Validate the Asociado in the database
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Asociado in Elasticsearch
        verify(mockAsociadoSearchRepository, times(0)).save(asociado);
    }

    @Test
    @Transactional
    public void deleteAsociado() throws Exception {
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);

        int databaseSizeBeforeDelete = asociadoRepository.findAll().size();

        // Delete the asociado
        restAsociadoMockMvc
            .perform(delete("/api/asociados/{id}", asociado.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Asociado> asociadoList = asociadoRepository.findAll();
        assertThat(asociadoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Asociado in Elasticsearch
        verify(mockAsociadoSearchRepository, times(1)).deleteById(asociado.getId());
    }

    @Test
    @Transactional
    public void searchAsociado() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        asociadoRepository.saveAndFlush(asociado);
        when(mockAsociadoSearchRepository.search(queryStringQuery("id:" + asociado.getId())))
            .thenReturn(Collections.singletonList(asociado));

        // Search the asociado
        restAsociadoMockMvc
            .perform(get("/api/_search/asociados?query=id:" + asociado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asociado.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].acciones").value(hasItem(DEFAULT_ACCIONES.booleanValue())))
            .andExpect(jsonPath("$.[*].bonos").value(hasItem(DEFAULT_BONOS.booleanValue())));
    }
}
