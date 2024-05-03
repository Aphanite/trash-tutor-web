<a href="https://trashtutor.com/"><img src="./src/assets/images/leaves.png" alt="logo" height="200"/></a>

# Trash Tutor

[trashtutor.com](https://trashtutor.com)

## What is Trash Tutor?

Trash Tutor is a personal project by [Ena Rajović](https://aphanite.net) designed to explore the use of Large Language Models (LLMs) in a production-ready application.

It assists users in recycling more effectively by using their device's camera to identify waste items and providing region-specific disposal instructions.

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
