package org.infyntrek.farmsync.repository;

import java.util.Optional;
import org.infyntrek.farmsync.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for persisting and looking up application users.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
