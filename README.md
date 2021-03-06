# Poker Game with Webassembly

A SPA Poker game, developed with Vuejs and Webassembly supported by the C programming language.
This project is not done and its pupose is for education.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Webassembly latest version](https://webassembly.org)
- [Nodejs latest version](https://nodejs.org/en/)
- CMake

[Brunch](https://brunch.io) is using for compiling assets.
You need update **brunch-config.json** to set the **emscripten**
directory for the environment.

### install

Go to the root of the project directory and enter the following in the
terminal:

```
$ npm install
$ brunch watch --server
```

Now go to the directory /poker/webassembly/wasm/src/main.c
and update some thing. This will automatically compile
the c source files and push it to the browser.

### Examples

Go to the JavaScript console in your browser and type:

```
> _getHand();
```

## Contributing

## Versioning

## Authors

* **chartera**


## License

This project is licensed under the MIT License.

## Todos

* Print c stacktrace over nodejs exec. (See brunch-config.js 77)
