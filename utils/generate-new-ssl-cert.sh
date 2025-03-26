#!/bin/bash

# Function to exit gracefully
exit_gracefully() {
  # This will only return if the script is sourced
  if [[ "${BASH_SOURCE[0]}" != "${0}" ]]; then
    return 0
  else
    exit 0
  fi
}

# Set the certificate name
CERT_NAME="polyglot"

# Generate a private key
openssl genpkey -algorithm RSA -out "$CERT_NAME-key.pem" -pkeyopt rsa_keygen_bits:2048

# Generate a certificate signing request (CSR)
openssl req -new -key "$CERT_NAME-key.pem" -out "$CERT_NAME.csr" -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=localhost"

# Generate a self-signed certificate (valid for 365 days)
openssl x509 -req -in "$CERT_NAME.csr" -signkey "$CERT_NAME-key.pem" -out "$CERT_NAME-cert.pem" -days 365

echo "Self-signed certificate generated: $CERT_NAME-cert.pem and $CERT_NAME-key.pem"

# Exit the script gracefully
exit_gracefully

