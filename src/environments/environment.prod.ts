export const environment = {
  production: true,
  DB_URL : 'https://isp20-828cd-default-rtdb.firebaseio.com/resto/',
  DB_NODE : localStorage.getItem('uid_hash') ? localStorage.getItem('uid_hash') : localStorage.getItem('public_uid_hash')
};
