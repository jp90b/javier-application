package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Pago2;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pago2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Pago2Repository extends JpaRepository<Pago2, Long> {}
