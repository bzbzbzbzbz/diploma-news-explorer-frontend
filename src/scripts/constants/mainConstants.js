export const newsURL = 'https://nomoreparties.co/news/v2'
export const apiURL = 'https://api.newsexplore.tk'
export const newsToken = 'f4fd6869460d4dca914e5c01d2d53a50'

//header

export const nonAuthHeader = document.querySelector('.nonAuth-header')
export const authHeader = document.querySelector('.auth-header');
export const loginButton = document.querySelector('.login-button');
export const logoutButton = document.querySelector('.logout-button');
export const userName = document.querySelector('.header__nav-login_name')
export const mobileMenuButton = document.querySelector('.header__nav-menu')
export const mobileHeader = document.querySelector('.header__nav_mobile');
export const mobileHeaderLoginButton = document.querySelector('.header__nav-login_mobile')
export const mobileSaved = document.querySelector('.header__nav-saved_mobile')

//popup
export const body = document.querySelector('.body')
export const popup = document.querySelector('.popup')
export let signInData = { };
export let signUpData = { };

//news-search

export const searchForm = document.querySelector('.search__form')
export const preloader = document.querySelector('.preloader')
export const nothingFound = document.querySelector('.no-results')
export const cardContainer = document.querySelector('.results__cardbox')
export const cardBlock = document.querySelector('.results');

const dateMethod = new Date();
export const today = function () {
  let day = dateMethod.getDate();
  let month = dateMethod.getMonth() + 1;
  let year = dateMethod.getFullYear();
  return year + '-' + month + '-' + day
}

export const weekago = function () {
  let past = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  let day = past.getDate();
  let month = past.getMonth() + 1;
  let year = past.getFullYear();
  return year + '-' + month + '-' + day
}
