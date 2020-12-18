# Meetify 
A Meetups App build with Vue.js and Firebase. User and Meetup created were stored in Firebase Realtime Database.   

1. User can view, create, and register meetup
1. User need to login to create and register for meetup.

## Demo  
Visit live demo app here : https://meetify.netlify.app/  
[![Netlify Status](https://api.netlify.com/api/v1/badges/5ebe0751-34d7-4590-b9bd-5dc22a0f6fe5/deploy-status)](https://app.netlify.com/sites/meetify/deploys)

## Screenshot
<img src="https://jw-aws-bucket.s3-ap-southeast-1.amazonaws.com/vue-meetup.png" alt="vue-meetup" width="100%">

<img src="https://jw-aws-bucket.s3-ap-southeast-1.amazonaws.com/create-meetup.png" alt="vue-meetup" width="100%">

## Deployment
1. Create a new file named `_redirect` in public folder, paste code below in the file.
    ```
    /*  /index.html  200
    ```

1. Set up environment variables
    ```
    VUE_APP_FIREBASE_API_KEY=""
    VUE_APP_FIREBASE_AUTH_DOMAIN=""
    VUE_APP_FIREBASE_PROJECT_ID=""
    VUE_APP_FIREBASE_STORAGE_BUCKET=""
    VUE_APP_FIREBASE_DB_URL=""
    VUE_APP_FIREBASE_SENDER_ID=""
    VUE_APP_FIREBASE_APP_ID=""
    ```

1. In build setting, set `CI= npm run build` as the Build command and `dist/` as Publish directory.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
