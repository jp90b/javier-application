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
 * A Cuota.
 */
@Entity
@Table(name = "cuota")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "cuota")
public class Cuota implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "abono_2019")
    private Boolean abono2019;

    @Column(name = "abono_2019_q", precision = 21, scale = 2)
    private BigDecimal abono2019Q;

    @Column(name = "fecha_2019_q")
    private Instant fecha2019Q;

    @Column(name = "abono_2020")
    private Boolean abono2020;

    @Column(name = "abono_2020_q", precision = 21, scale = 2)
    private BigDecimal abono2020Q;

    @Column(name = "fecha_2020_q")
    private Instant fecha2020Q;

    @ManyToOne
    @JsonIgnoreProperties(value = "cuotas", allowSetters = true)
    private Asociado asociado;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isAbono2019() {
        return abono2019;
    }

    public Cuota abono2019(Boolean abono2019) {
        this.abono2019 = abono2019;
        return this;
    }

    public void setAbono2019(Boolean abono2019) {
        this.abono2019 = abono2019;
    }

    public BigDecimal getAbono2019Q() {
        return abono2019Q;
    }

    public Cuota abono2019Q(BigDecimal abono2019Q) {
        this.abono2019Q = abono2019Q;
        return this;
    }

    public void setAbono2019Q(BigDecimal abono2019Q) {
        this.abono2019Q = abono2019Q;
    }

    public Instant getFecha2019Q() {
        return fecha2019Q;
    }

    public Cuota fecha2019Q(Instant fecha2019Q) {
        this.fecha2019Q = fecha2019Q;
        return this;
    }

    public void setFecha2019Q(Instant fecha2019Q) {
        this.fecha2019Q = fecha2019Q;
    }

    public Boolean isAbono2020() {
        return abono2020;
    }

    public Cuota abono2020(Boolean abono2020) {
        this.abono2020 = abono2020;
        return this;
    }

    public void setAbono2020(Boolean abono2020) {
        this.abono2020 = abono2020;
    }

    public BigDecimal getAbono2020Q() {
        return abono2020Q;
    }

    public Cuota abono2020Q(BigDecimal abono2020Q) {
        this.abono2020Q = abono2020Q;
        return this;
    }

    public void setAbono2020Q(BigDecimal abono2020Q) {
        this.abono2020Q = abono2020Q;
    }

    public Instant getFecha2020Q() {
        return fecha2020Q;
    }

    public Cuota fecha2020Q(Instant fecha2020Q) {
        this.fecha2020Q = fecha2020Q;
        return this;
    }

    public void setFecha2020Q(Instant fecha2020Q) {
        this.fecha2020Q = fecha2020Q;
    }

    public Asociado getAsociado() {
        return asociado;
    }

    public Cuota asociado(Asociado asociado) {
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
        if (!(o instanceof Cuota)) {
            return false;
        }
        return id != null && id.equals(((Cuota) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cuota{" +
            "id=" + getId() +
            ", abono2019='" + isAbono2019() + "'" +
            ", abono2019Q=" + getAbono2019Q() +
            ", fecha2019Q='" + getFecha2019Q() + "'" +
            ", abono2020='" + isAbono2020() + "'" +
            ", abono2020Q=" + getAbono2020Q() +
            ", fecha2020Q='" + getFecha2020Q() + "'" +
            "}";
    }
}
