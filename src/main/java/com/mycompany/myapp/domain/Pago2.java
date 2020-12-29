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
 * A Pago2.
 */
@Entity
@Table(name = "pago_2")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "pago2")
public class Pago2 implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cantidad_2", precision = 21, scale = 2)
    private BigDecimal cantidad2;

    @Column(name = "fecha_2")
    private Instant fecha2;

    @ManyToOne
    @JsonIgnoreProperties(value = "pago2s", allowSetters = true)
    private Asociado asociado;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getCantidad2() {
        return cantidad2;
    }

    public Pago2 cantidad2(BigDecimal cantidad2) {
        this.cantidad2 = cantidad2;
        return this;
    }

    public void setCantidad2(BigDecimal cantidad2) {
        this.cantidad2 = cantidad2;
    }

    public Instant getFecha2() {
        return fecha2;
    }

    public Pago2 fecha2(Instant fecha2) {
        this.fecha2 = fecha2;
        return this;
    }

    public void setFecha2(Instant fecha2) {
        this.fecha2 = fecha2;
    }

    public Asociado getAsociado() {
        return asociado;
    }

    public Pago2 asociado(Asociado asociado) {
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
        if (!(o instanceof Pago2)) {
            return false;
        }
        return id != null && id.equals(((Pago2) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pago2{" +
            "id=" + getId() +
            ", cantidad2=" + getCantidad2() +
            ", fecha2='" + getFecha2() + "'" +
            "}";
    }
}
