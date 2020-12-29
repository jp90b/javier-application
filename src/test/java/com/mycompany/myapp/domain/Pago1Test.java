package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class Pago1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pago1.class);
        Pago1 pago11 = new Pago1();
        pago11.setId(1L);
        Pago1 pago12 = new Pago1();
        pago12.setId(pago11.getId());
        assertThat(pago11).isEqualTo(pago12);
        pago12.setId(2L);
        assertThat(pago11).isNotEqualTo(pago12);
        pago11.setId(null);
        assertThat(pago11).isNotEqualTo(pago12);
    }
}
