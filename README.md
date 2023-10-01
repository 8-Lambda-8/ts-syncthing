# ts-syncthing

syncthing rest api binding for typescript

not all endpoints are implemented yet

### Install

To install the latest version of this library:

```sh
$ npm install ts-syncthing@latest
```

## Usage

### Setup

```ts
import { syncthing } from "../src/syncthing";

const st = new syncthing({
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

  host: "excample.com", // IP or Hostname, default: "127.0.0.1"
  path: "/syncthing", // Path to syncthing,  default: ""
  port: 443, // default: 8384
  https: true, // default: false
  timeout: 2_000, // ms, default 10s
});
```

### Requesting

```ts
// with Callback
st.system.ping((res, err) => {
  // do something
});

// with Promise
st.system
  .ping()
  .then((res) => {
    // do something
  })
  .catch((err) => {
    // do something
  });

// or await promise
const response = await st.system.ping();
```
