// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  DB_URL : 'https://isp20-828cd-default-rtdb.firebaseio.com/resto/',
  DB_NODE : localStorage.getItem('uid_hash') ? localStorage.getItem('uid_hash') : localStorage.getItem('public_uid_hash'),
  firebaseConfig : {
    apiKey: "AIzaSyBpVBuWRHDkWh07JhGgnxLVIAWLFgGcPLM",
    authDomain: "isp20-828cd.firebaseapp.com",
    databaseURL: "https://isp20-828cd-default-rtdb.firebaseio.com",
    projectId: "isp20-828cd",
    storageBucket: "isp20-828cd.appspot.com",
    messagingSenderId: "834409981790",
    appId: "1:834409981790:web:890535628e8164030911cf",
    measurementId: "G-B5J846TVLQ"
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
