package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class Pago2Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pago2.class);
        Pago2 pago21 = new Pago2();
        pago21.setId(1L);
        Pago2 pago22 = new Pago2();
        pago22.setId(pago21.getId());
        assertThat(pago21).isEqualTo(pago22);
        pago22.setId(2L);
        assertThat(pago21).isNotEqualTo(pago22);
        pago21.setId(null);
        assertThat(pago21).isNotEqualTo(pago22);
    }
}
