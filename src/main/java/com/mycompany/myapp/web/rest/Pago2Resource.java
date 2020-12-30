package com.mycompany.myapp.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Pago2;
import com.mycompany.myapp.repository.Pago2Repository;
import com.mycompany.myapp.repository.search.Pago2SearchRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Pago2}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Pago2Resource {
    private final Logger log = LoggerFactory.getLogger(Pago2Resource.class);

    private static final String ENTITY_NAME = "pago2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Pago2Repository pago2Repository;

    private final Pago2SearchRepository pago2SearchRepository;

    public Pago2Resource(Pago2Repository pago2Repository, Pago2SearchRepository pago2SearchRepository) {
        this.pago2Repository = pago2Repository;
        this.pago2SearchRepository = pago2SearchRepository;
    }

    /**
     * {@code POST  /pago-2-s} : Create a new pago2.
     *
     * @param pago2 the pago2 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pago2, or with status {@code 400 (Bad Request)} if the pago2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pago-2-s")
    public ResponseEntity<Pago2> createPago2(@RequestBody Pago2 pago2) throws URISyntaxException {
        log.debug("REST request to save Pago2 : {}", pago2);
        if (pago2.getId() != null) {
            throw new BadRequestAlertException("A new pago2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pago2 result = pago2Repository.save(pago2);
        pago2SearchRepository.save(result);
        return ResponseEntity
            .created(new URI("/api/pago-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pago-2-s} : Updates an existing pago2.
     *
     * @param pago2 the pago2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pago2,
     * or with status {@code 400 (Bad Request)} if the pago2 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pago2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pago-2-s")
    public ResponseEntity<Pago2> updatePago2(@RequestBody Pago2 pago2) throws URISyntaxException {
        log.debug("REST request to update Pago2 : {}", pago2);
        if (pago2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pago2 result = pago2Repository.save(pago2);
        pago2SearchRepository.save(result);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pago2.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pago-2-s} : get all the pago2s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pago2s in body.
     */
    @GetMapping("/pago-2-s")
    public List<Pago2> getAllPago2s() {
        log.debug("REST request to get all Pago2s");
        return pago2Repository.findAll();
    }

    /**
     * {@code GET  /pago-2-s/:id} : get the "id" pago2.
     *
     * @param id the id of the pago2 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pago2, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pago-2-s/{id}")
    public ResponseEntity<Pago2> getPago2(@PathVariable Long id) {
        log.debug("REST request to get Pago2 : {}", id);
        Optional<Pago2> pago2 = pago2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(pago2);
    }

    /**
     * {@code DELETE  /pago-2-s/:id} : delete the "id" pago2.
     *
     * @param id the id of the pago2 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pago-2-s/{id}")
    public ResponseEntity<Void> deletePago2(@PathVariable Long id) {
        log.debug("REST request to delete Pago2 : {}", id);
        pago2Repository.deleteById(id);
        pago2SearchRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code SEARCH  /_search/pago-2-s?query=:query} : search for the pago2 corresponding
     * to the query.
     *
     * @param query the query of the pago2 search.
     * @return the result of the search.
     */
    @GetMapping("/_search/pago-2-s")
    public List<Pago2> searchPago2s(@RequestParam String query) {
        log.debug("REST request to search Pago2s for query {}", query);
        return StreamSupport
            .stream(pago2SearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
