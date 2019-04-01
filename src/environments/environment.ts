// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.




//*********** DATABASE CONNECTION FOR TESTING MODE *************
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyAwKEsWodtnrprOhYXA5tFb9zbUnLqOBk4",
    authDomain: "yedidim-sandbox-2.firebaseapp.com",
    databaseURL: "https://yedidim-sandbox-2.firebaseio.com",
    storageBucket: "yedidim-sandbox-2.appspot.com"
}
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
