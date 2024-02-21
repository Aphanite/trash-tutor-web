# Trash Tutor

## HTTPS

#### Run once per computer / phone

```
brew install mkcert
mkcert -install
```

Install `~/Library/Application Support/mkcert/rootCA.pem` onto your phone (via AirDrop for example).

#### Run each time your IP changes

```
mkcert \
	-cert-file "$HOME/Library/Application Support/mkcert/dev-cert.pem" \
	-key-file "$HOME/Library/Application Support/mkcert/dev-key.pem" \
	localhost 127.0.0.1 192.168.1.8
```

note: change the 192.168.x.x IP
