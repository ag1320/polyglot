#!/bin/bash

# Set certificate details
CERT_NAME="polyglot"
CERT_FILE="$CERT_NAME-cert.pem"
DAYS_BEFORE_RENEW=30

#cd into correct directory
cd ~/polyglot/utils/

# Function to exit gracefully
exit_gracefully() {
  # This will only return if the script is sourced
  if [[ "${BASH_SOURCE[0]}" != "${0}" ]]; then
    return 0
  else
    exit 0
  fi
}

# Check if the certificate exists
if [ ! -f "$CERT_FILE" ]; then
  echo "No existing certificate found. Generating a new one..."
  ./generate-new-ssl-cert.sh
fi

# Get the certificate's expiration date
EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
EXPIRY_TIMESTAMP=$(date -d "$EXPIRY_DATE" +%s) # Convert to timestamp
CURRENT_TIMESTAMP=$(date +%s)
DAYS_LEFT=$(( (EXPIRY_TIMESTAMP - CURRENT_TIMESTAMP) / 86400 )) # Convert seconds to days

# Check if the certificate is close to expiring
if [ "$DAYS_LEFT" -le "$DAYS_BEFORE_RENEW" ]; then
  echo "SSL certificate expires in $DAYS_LEFT days. Renewing..."
  ./generate-new-ssl-cert.sh
else
  echo "SSL certificate is still valid for $DAYS_LEFT days. No renewal needed."
fi

# Exit the script gracefully
exit_gracefully
