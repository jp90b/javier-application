package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class AsociadoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Asociado.class);
        Asociado asociado1 = new Asociado();
        asociado1.setId(1L);
        Asociado asociado2 = new Asociado();
        asociado2.setId(asociado1.getId());
        assertThat(asociado1).isEqualTo(asociado2);
        asociado2.setId(2L);
        assertThat(asociado1).isNotEqualTo(asociado2);
        asociado1.setId(null);
        assertThat(asociado1).isNotEqualTo(asociado2);
    }
}
