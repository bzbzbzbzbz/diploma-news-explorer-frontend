import "../styles/index.css"

//popups'n'header

const body = document.querySelector('.body')
const loginButton = document.querySelector('.header__nav-login');
const signInPopup = document.querySelector('.popup__signin');
const signInLink = document.querySelector('.popup__signin-form-link');
const signUpPopup = document.querySelector('.popup__signup');
const signUpLink = document.querySelector('.popup__signup-form-link');
const signUpSubmit = document.querySelector('.popup__signup-form-submit');
const signUpSuccess = document.querySelector('.popup__signup-success');
const signUpSuccessButton = document.querySelector('.popup__signup-success-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelectorAll('.close-button');
const logoutHeaderNav = document.querySelector('.logout')
const loginHeaderNav = document.querySelector('.login')

loginButton.addEventListener('click', () => {
  body.classList.add('overflow')
  popup.classList.remove('disabled');
  signInPopup.classList.remove('disabled');
})

signInLink.addEventListener('click', () => {
  signInPopup.classList.add('disabled');
  signUpPopup.classList.remove('disabled');
})

signUpLink.addEventListener('click', () => {
  signUpPopup.classList.add('disabled');
  signInPopup.classList.remove('disabled');
})

signUpSubmit.addEventListener('click', () => {
  signUpPopup.classList.add('disabled');
  signUpSuccess.classList.remove('disabled')
})

signUpSuccessButton.addEventListener('click', () => {
  popup.classList.add('disabled');
  body.classList.remove('overflow')
  signUpSuccess.classList.add('disabled');
  logoutHeaderNav.classList.add('disabled');
  loginHeaderNav.classList.remove('disabled')
})

closeButton.forEach((item) => {
  item.addEventListener('click', () => {
    body.classList.remove('overflow')
    item.parentElement.classList.add('disabled');
    popup.classList.add('disabled');
  })
})

//bookmarks

const bookmark = document.querySelectorAll('.results__card-bookmark');
const bookmarkAuth = document.querySelector('.results__card-bookmark-auth');

bookmarkAuth.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  body.classList.add('overflow')
  popup.classList.remove('disabled');
  signInPopup.classList.remove('disabled');

})

bookmark.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.add('results__card-bookmark-saved');
  })
})
