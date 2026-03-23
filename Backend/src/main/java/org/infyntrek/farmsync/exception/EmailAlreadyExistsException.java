package org.infyntrek.farmsync.exception;

/**
 * Raised when a signup request uses an email address that is already registered.
 */
public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
