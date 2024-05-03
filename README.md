# Trash <img src="src/assets/images/leaves.png" alt="logo" height="30"/> Tutor

[trashtutor.com](https://trashtutor.com)

## What is Trash Tutor?

Trash Tutor is a personal project by [Ena Rajović](https://aphanite.net) designed to explore the use of Large Language Models (LLMs) in a production-ready application.

It assists users in recycling more effectively by using their device's camera to identify waste items and providing region-specific disposal instructions.

## Installation/Usage

To install all dependencies:

```
yarn install
```

To start the local development server:

```
yarn dev
```

To expose the local development server on the network, e.g. for testing on the phone:

```
yarn dev --host
```

### HTTPS

If you want to access Trash Tutor on the local network on your phone, you must enable https.
Accessing the camera with `getUserMedia()` is only allowed on secure (https) connections or localhost.

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
