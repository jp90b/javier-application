package com.mycompany.myapp.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Pago1;
import com.mycompany.myapp.repository.Pago1Repository;
import com.mycompany.myapp.repository.search.Pago1SearchRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Pago1}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Pago1Resource {
    private final Logger log = LoggerFactory.getLogger(Pago1Resource.class);

    private static final String ENTITY_NAME = "pago1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Pago1Repository pago1Repository;

    private final Pago1SearchRepository pago1SearchRepository;

    public Pago1Resource(Pago1Repository pago1Repository, Pago1SearchRepository pago1SearchRepository) {
        this.pago1Repository = pago1Repository;
        this.pago1SearchRepository = pago1SearchRepository;
    }

    /**
     * {@code POST  /pago-1-s} : Create a new pago1.
     *
     * @param pago1 the pago1 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pago1, or with status {@code 400 (Bad Request)} if the pago1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pago-1-s")
    public ResponseEntity<Pago1> createPago1(@RequestBody Pago1 pago1) throws URISyntaxException {
        log.debug("REST request to save Pago1 : {}", pago1);
        if (pago1.getId() != null) {
            throw new BadRequestAlertException("A new pago1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pago1 result = pago1Repository.save(pago1);
        pago1SearchRepository.save(result);
        return ResponseEntity
            .created(new URI("/api/pago-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pago-1-s} : Updates an existing pago1.
     *
     * @param pago1 the pago1 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pago1,
     * or with status {@code 400 (Bad Request)} if the pago1 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pago1 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pago-1-s")
    public ResponseEntity<Pago1> updatePago1(@RequestBody Pago1 pago1) throws URISyntaxException {
        log.debug("REST request to update Pago1 : {}", pago1);
        if (pago1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pago1 result = pago1Repository.save(pago1);
        pago1SearchRepository.save(result);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pago1.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pago-1-s} : get all the pago1s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pago1s in body.
     */
    @GetMapping("/pago-1-s")
    public List<Pago1> getAllPago1s() {
        log.debug("REST request to get all Pago1s");
        return pago1Repository.findAll();
    }

    /**
     * {@code GET  /pago-1-s/:id} : get the "id" pago1.
     *
     * @param id the id of the pago1 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pago1, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pago-1-s/{id}")
    public ResponseEntity<Pago1> getPago1(@PathVariable Long id) {
        log.debug("REST request to get Pago1 : {}", id);
        Optional<Pago1> pago1 = pago1Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(pago1);
    }

    /**
     * {@code DELETE  /pago-1-s/:id} : delete the "id" pago1.
     *
     * @param id the id of the pago1 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pago-1-s/{id}")
    public ResponseEntity<Void> deletePago1(@PathVariable Long id) {
        log.debug("REST request to delete Pago1 : {}", id);
        pago1Repository.deleteById(id);
        pago1SearchRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code SEARCH  /_search/pago-1-s?query=:query} : search for the pago1 corresponding
     * to the query.
     *
     * @param query the query of the pago1 search.
     * @return the result of the search.
     */
    @GetMapping("/_search/pago-1-s")
    public List<Pago1> searchPago1s(@RequestParam String query) {
        log.debug("REST request to search Pago1s for query {}", query);
        return StreamSupport
            .stream(pago1SearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
