package com.mycompany.myapp.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Cuota;
import com.mycompany.myapp.repository.CuotaRepository;
import com.mycompany.myapp.repository.search.CuotaSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Cuota}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CuotaResource {
    private final Logger log = LoggerFactory.getLogger(CuotaResource.class);

    private static final String ENTITY_NAME = "cuota";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CuotaRepository cuotaRepository;

    private final CuotaSearchRepository cuotaSearchRepository;

    public CuotaResource(CuotaRepository cuotaRepository, CuotaSearchRepository cuotaSearchRepository) {
        this.cuotaRepository = cuotaRepository;
        this.cuotaSearchRepository = cuotaSearchRepository;
    }

    /**
     * {@code POST  /cuotas} : Create a new cuota.
     *
     * @param cuota the cuota to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cuota, or with status {@code 400 (Bad Request)} if the cuota has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cuotas")
    public ResponseEntity<Cuota> createCuota(@RequestBody Cuota cuota) throws URISyntaxException {
        log.debug("REST request to save Cuota : {}", cuota);
        if (cuota.getId() != null) {
            throw new BadRequestAlertException("A new cuota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cuota result = cuotaRepository.save(cuota);
        cuotaSearchRepository.save(result);
        return ResponseEntity
            .created(new URI("/api/cuotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cuotas} : Updates an existing cuota.
     *
     * @param cuota the cuota to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cuota,
     * or with status {@code 400 (Bad Request)} if the cuota is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cuota couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cuotas")
    public ResponseEntity<Cuota> updateCuota(@RequestBody Cuota cuota) throws URISyntaxException {
        log.debug("REST request to update Cuota : {}", cuota);
        if (cuota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cuota result = cuotaRepository.save(cuota);
        cuotaSearchRepository.save(result);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cuota.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cuotas} : get all the cuotas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cuotas in body.
     */
    @GetMapping("/cuotas")
    public List<Cuota> getAllCuotas() {
        log.debug("REST request to get all Cuotas");
        return cuotaRepository.findAll();
    }

    /**
     * {@code GET  /cuotas/:id} : get the "id" cuota.
     *
     * @param id the id of the cuota to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cuota, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cuotas/{id}")
    public ResponseEntity<Cuota> getCuota(@PathVariable Long id) {
        log.debug("REST request to get Cuota : {}", id);
        Optional<Cuota> cuota = cuotaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cuota);
    }

    /**
     * {@code DELETE  /cuotas/:id} : delete the "id" cuota.
     *
     * @param id the id of the cuota to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cuotas/{id}")
    public ResponseEntity<Void> deleteCuota(@PathVariable Long id) {
        log.debug("REST request to delete Cuota : {}", id);
        cuotaRepository.deleteById(id);
        cuotaSearchRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code SEARCH  /_search/cuotas?query=:query} : search for the cuota corresponding
     * to the query.
     *
     * @param query the query of the cuota search.
     * @return the result of the search.
     */
    @GetMapping("/_search/cuotas")
    public List<Cuota> searchCuotas(@RequestParam String query) {
        log.debug("REST request to search Cuotas for query {}", query);
        return StreamSupport
            .stream(cuotaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
