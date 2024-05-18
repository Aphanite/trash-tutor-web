# Trash Tutor

[trashtutor.com](https://trashtutor.com)

## What is Trash Tutor?

Trash Tutor is a personal project by [Ena Rajović](https://aphanite.net) designed to explore the use of Large Language Models (LLMs) in a production-ready application.

By taking a picture of an item you wish to dispose of, Trash Tutor will determine the right waste category for it based on local guidelines.

<img src="src/assets/images/mockup.webp" alt="Trash Tutor app" height="500"/>

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

## Contributing

Contributors welcome! Feel free to open PRs to further improve the project.

#### Possible tasks/improvements

- Expand the waste category data in `src/data` by adding entries for more countries, using the appropriate country codes as per Geoapify conventions. Currently, data is statically defined only for Germany and Hungary; for all other nations, it's dynamically generated on request.

- Create a database to store waste categories.

- Improve loading animation to create a more engaging user experience.
