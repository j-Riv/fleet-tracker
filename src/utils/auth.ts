import store from '../store';

export function getIdToken() {
  return localStorage.getItem('token');
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken;
}

export function isLoggedOut(to, from, next) {
  if (isLoggedIn()) {
    next({
      path: '/vehicles',
    });
  } else {
    next();
  }
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      // query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function requireAuthAdmin(to, from, next) {
  if (isLoggedIn() && store.getters.isAdmin) {
    next();
  } else if (isLoggedIn()) {
    next({ path: '/dashboard' });
  } else {
    next({ path: '/' });
  }
}

// export function isLoggedIn() {
//   const idToken = getIdToken()
//   return !!idToken && !isTokenExpired(idToken)
// }
