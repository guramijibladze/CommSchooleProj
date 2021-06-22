// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  movieApiBase: 'http://www.omdbapi.com/?apikey=540d1872',
  firebase: {
    apiKey: "AIzaSyCH1cisiThGRZF1bQgoNT_u0nnN8sdedvs",
    authDomain: "tbcommproj.firebaseapp.com",
    projectId: "tbcommproj",
    storageBucket: "tbcommproj.appspot.com",
    messagingSenderId: "384199642480",
    appId: "1:384199642480:web:2f1887dc472ae1a4a693b5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
