package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * A Pago1.
 */
@Entity
@Table(name = "pago_1")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "pago1")
public class Pago1 implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cantidad_1", precision = 21, scale = 2)
    private BigDecimal cantidad1;

    @Column(name = "fecha_1")
    private Instant fecha1;

    @ManyToOne
    @JsonIgnoreProperties(value = "pago1s", allowSetters = true)
    private Asociado asociado;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getCantidad1() {
        return cantidad1;
    }

    public Pago1 cantidad1(BigDecimal cantidad1) {
        this.cantidad1 = cantidad1;
        return this;
    }

    public void setCantidad1(BigDecimal cantidad1) {
        this.cantidad1 = cantidad1;
    }

    public Instant getFecha1() {
        return fecha1;
    }

    public Pago1 fecha1(Instant fecha1) {
        this.fecha1 = fecha1;
        return this;
    }

    public void setFecha1(Instant fecha1) {
        this.fecha1 = fecha1;
    }

    public Asociado getAsociado() {
        return asociado;
    }

    public Pago1 asociado(Asociado asociado) {
        this.asociado = asociado;
        return this;
    }

    public void setAsociado(Asociado asociado) {
        this.asociado = asociado;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pago1)) {
            return false;
        }
        return id != null && id.equals(((Pago1) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pago1{" +
            "id=" + getId() +
            ", cantidad1=" + getCantidad1() +
            ", fecha1='" + getFecha1() + "'" +
            "}";
    }
}
