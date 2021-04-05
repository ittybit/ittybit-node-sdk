
![Ittybit Logo](http://ittybit.com/img/logo.svg)

Simple library for interacting with the Ittybit API

---

## Getting Started

```npm i @ittybit/sdk```

---
All usage is secured by the `ittybit-token` which is available to generate from the ittybit console [click here to sign in](https://ittybit.com)

```js
const { Ittybit } = require('@ittybit/sdk');

const ibit = new Ittybit({token: 'JWT'});

(async () => {
    try {
        const videos = await ibit.listVideos()
        console.log(videos);
    } catch(e) {
        console.log(e);
    }
})();
```

*** Please NOTE THAT THIS SDK IS NOT READY UNTIL 1.0 RELEASE. EXPECT ERRORS AND CHANGES BEFORE HAND