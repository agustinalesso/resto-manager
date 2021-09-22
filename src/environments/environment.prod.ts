export const environment = {
  production: true,
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
