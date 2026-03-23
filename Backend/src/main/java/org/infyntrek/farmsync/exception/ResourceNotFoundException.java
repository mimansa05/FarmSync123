package org.infyntrek.farmsync.exception;

/**
 * Raised when a requested domain resource cannot be found.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
