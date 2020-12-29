package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Asociado;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Asociado} entity.
 */
public interface AsociadoSearchRepository extends ElasticsearchRepository<Asociado, Long> {}
