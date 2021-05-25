
![Ittybit Logo](https://storage.googleapis.com/ittybit.dev/ittybit_logo_light_df8a23a33f/ittybit_logo_light_df8a23a33f.svg)

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


# Image

## List Image 
Returns a list of images uploaded to you your account (filtering features to be added in the future)

```js
const images = await ittybit.listImages();
```

## Get Image 
Returns a URL for the image. This is not an `await` function as it just appends an ID to the end of the following url https://api.ittybit.com/image/{id} 

```js
const image = ittybit.getImage('123456');
```

# Video

## List Videos
Returns an array of videos in our video object form. This object has 3 states. Uploading, Pending, Complete. These have different elements. Please see the api documentation for our video objects.

```js
const videos = await listVideos();
```

## Get Video
Returns a single video object (which has 3 states)

```js
const video = await ittybit.getVideo('12345678');
```

*** Please NOTE THAT THIS SDK IS NOT READY UNTIL 1.0 RELEASE. EXPECT ERRORS AND CHANGES BEFORE HAND