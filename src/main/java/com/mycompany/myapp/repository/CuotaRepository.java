package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Cuota;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cuota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {}
