// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  DB_URL : 'https://resto-manager-f9ba4-default-rtdb.firebaseio.com/resto/',
  DB_NODE : localStorage.getItem('uid_hash'),
  firebaseConfig : {
    apiKey: "AIzaSyA2TmppHMoAh69o8ED_us0-1Mya8abcNWQ",
    authDomain: "resto-manager-f9ba4.firebaseapp.com",
    databaseURL: "https://resto-manager-f9ba4-default-rtdb.firebaseio.com",
    projectId: "resto-manager-f9ba4",
    storageBucket: "resto-manager-f9ba4.appspot.com",
    messagingSenderId: "777087440030",
    appId: "1:777087440030:web:6ffa8d3b4402f3412e578f"
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
