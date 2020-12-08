export default class Header {
  constructor(nonAuthHeader, authHeader, logoutButton, userName) {
    this.nonAuthHeader = nonAuthHeader;
    this.authHeader = authHeader;
    this.logoutButton = logoutButton
    this.userName = userName;
  }

  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.nonAuthHeader.classList.add('disabled');
      this.authHeader.classList.remove('disabled');
      this.userName.textContent = userName;
      this.logoutButton.addEventListener('click', () => {
        if (location.pathname.includes('saved')) {
          localStorage.removeItem('jwt');
          window.location.replace('./index.html');
        } else {
          localStorage.removeItem('jwt');
          location.reload()
        }
      })
    } else  {
      this.nonAuthHeader.classList.remove('disabled');
      this.authHeader.classList.add('disabled');
      this.userName.textContent = '';
    }
  }

}
