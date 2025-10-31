export const setLoggedIn = (bool) => localStorage.setItem('loggedIn', bool);
export const checkLoggedIn = () => localStorage.getItem('loggedIn') === 'true';
export const clearLoggedIn = () => localStorage.removeItem('loggedIn');
