package com.mycompany.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link Pago2SearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class Pago2SearchRepositoryMockConfiguration {
    @MockBean
    private Pago2SearchRepository mockPago2SearchRepository;
}
