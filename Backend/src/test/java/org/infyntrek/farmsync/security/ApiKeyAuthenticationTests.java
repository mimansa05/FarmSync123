package org.infyntrek.farmsync.security;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties = "spring.main.allow-bean-definition-overriding=true")
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class ApiKeyAuthenticationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void validApiKeyAllowsAccessToUserDashboard() throws Exception {
        mockMvc.perform(get("/api/user/dashboard").header("X-API-KEY", "test-user-key"))
                .andExpect(status().isOk());
    }

    @Test
    void invalidApiKeyReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/user/dashboard").header("X-API-KEY", "invalid-api-key"))
                .andExpect(status().isUnauthorized());
    }
}
