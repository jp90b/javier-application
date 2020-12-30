package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Pago1;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pago1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Pago1Repository extends JpaRepository<Pago1, Long> {}
