package org.infyntrek.farmsync.security;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Manages a set of API keys and their effective Spring security roles.
 * API keys are configured through application properties:
 * application.security.api-keys=<key1>:USER,<key2>:ADMIN
 */
@Component
public class ApiKeyService {

    @Value("${application.security.api-keys:}")
    private String apiKeysProperty;

    private Map<String, String> apiKeyRoles = new HashMap<>();

    @PostConstruct
    public void init() {
        apiKeyRoles = parseApiKeys(apiKeysProperty);
    }

    Map<String, String> parseApiKeys(String property) {
        if (!StringUtils.hasText(property)) {
            return Collections.emptyMap();
        }

        Map<String, String> map = new HashMap<>();

        for (String rawEntry : property.split(",")) {
            String entry = rawEntry.trim();
            if (!StringUtils.hasText(entry)) {
                continue;
            }

            String[] parts = entry.split(":", 2);
            String key = parts[0].trim();
            String role = parts.length > 1 ? parts[1].trim() : "USER";

            if (!StringUtils.hasText(key)) {
                continue;
            }

            if (!StringUtils.hasText(role)) {
                role = "USER";
            }

            map.put(key, role.toUpperCase());
        }

        return Collections.unmodifiableMap(map);
    }

    public boolean isValid(String apiKey) {
        return StringUtils.hasText(apiKey) && apiKeyRoles.containsKey(apiKey);
    }

    public Optional<String> roleForKey(String apiKey) {
        return Optional.ofNullable(apiKeyRoles.get(apiKey));
    }
}
