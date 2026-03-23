package org.infyntrek.farmsync;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Minimal startup test that verifies the Spring context can boot successfully.
 */
@SpringBootTest
@ActiveProfiles("test")
class FarmSyncCropExpenseTrackerApplicationTests {

    @Test
    void contextLoads() {
    }
}
