package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Pago1;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Pago1} entity.
 */
public interface Pago1SearchRepository extends ElasticsearchRepository<Pago1, Long> {}
