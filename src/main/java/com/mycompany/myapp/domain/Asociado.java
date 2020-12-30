package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * A Asociado.
 */
@Entity
@Table(name = "asociado")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "asociado")
public class Asociado implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellidos")
    private String apellidos;

    @Column(name = "email")
    private String email;

    @Column(name = "acciones")
    private Boolean acciones;

    @Column(name = "bonos")
    private Boolean bonos;

    @OneToMany(mappedBy = "asociado")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pago1> pago1s = new HashSet<>();

    @OneToMany(mappedBy = "asociado")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pago2> pago2s = new HashSet<>();

    @OneToMany(mappedBy = "asociado")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Cuota> cuotas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Asociado nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Asociado apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public Asociado email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isAcciones() {
        return acciones;
    }

    public Asociado acciones(Boolean acciones) {
        this.acciones = acciones;
        return this;
    }

    public void setAcciones(Boolean acciones) {
        this.acciones = acciones;
    }

    public Boolean isBonos() {
        return bonos;
    }

    public Asociado bonos(Boolean bonos) {
        this.bonos = bonos;
        return this;
    }

    public void setBonos(Boolean bonos) {
        this.bonos = bonos;
    }

    public Set<Pago1> getPago1s() {
        return pago1s;
    }

    public Asociado pago1s(Set<Pago1> pago1s) {
        this.pago1s = pago1s;
        return this;
    }

    public Asociado addPago1(Pago1 pago1) {
        this.pago1s.add(pago1);
        pago1.setAsociado(this);
        return this;
    }

    public Asociado removePago1(Pago1 pago1) {
        this.pago1s.remove(pago1);
        pago1.setAsociado(null);
        return this;
    }

    public void setPago1s(Set<Pago1> pago1s) {
        this.pago1s = pago1s;
    }

    public Set<Pago2> getPago2s() {
        return pago2s;
    }

    public Asociado pago2s(Set<Pago2> pago2s) {
        this.pago2s = pago2s;
        return this;
    }

    public Asociado addPago2(Pago2 pago2) {
        this.pago2s.add(pago2);
        pago2.setAsociado(this);
        return this;
    }

    public Asociado removePago2(Pago2 pago2) {
        this.pago2s.remove(pago2);
        pago2.setAsociado(null);
        return this;
    }

    public void setPago2s(Set<Pago2> pago2s) {
        this.pago2s = pago2s;
    }

    public Set<Cuota> getCuotas() {
        return cuotas;
    }

    public Asociado cuotas(Set<Cuota> cuotas) {
        this.cuotas = cuotas;
        return this;
    }

    public Asociado addCuota(Cuota cuota) {
        this.cuotas.add(cuota);
        cuota.setAsociado(this);
        return this;
    }

    public Asociado removeCuota(Cuota cuota) {
        this.cuotas.remove(cuota);
        cuota.setAsociado(null);
        return this;
    }

    public void setCuotas(Set<Cuota> cuotas) {
        this.cuotas = cuotas;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Asociado)) {
            return false;
        }
        return id != null && id.equals(((Asociado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Asociado{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", email='" + getEmail() + "'" +
            ", acciones='" + isAcciones() + "'" +
            ", bonos='" + isBonos() + "'" +
            "}";
    }
}
