package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Cuota;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Cuota} entity.
 */
public interface CuotaSearchRepository extends ElasticsearchRepository<Cuota, Long> {}
