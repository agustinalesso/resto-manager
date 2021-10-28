export const environment = {
  production: true,
  BASE_URL: 'https://isp20-828cd.web.app',
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
