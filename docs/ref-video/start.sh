#!/usr/bin/env bash

echo brew install miniserve

miniserve \
  --index index.html \
  --tls-cert "$HOME/Library/Application Support/mkcert/dev-cert.pem" \
  --tls-key "$HOME/Library/Application Support/mkcert/dev-key.pem" \
  --header "Expires: Sat, 01 Jan 2000 00:00:00 GMT" \
  --header "Cache-Control: private, no-cache, no-store, must-revalidate" \
  --header "Pragma: no-cache" \
  -p 8081 \
  .


