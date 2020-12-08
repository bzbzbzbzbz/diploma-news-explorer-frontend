import "../../styles/index.css"

//modules
import MainAPI from "../API/MainAPI";
import NewsApi from "../API/NewsApi";
import Header from "../components/Header";
import Popup from "../components/Popup";
import NewsCardList from "../components/NewsCardList";
import NewsCard from "../components/NewsCard";

//constants
import * as constants from '../constants/mainConstants'

//class handlers
const mainApiClass = new MainAPI(constants.apiURL);
const newsAPIClass = new NewsApi(constants.newsURL, constants.newsToken);
const newsCardClass = new NewsCard(constants.cardBlock, constants.cardContainer)
const newsCardListClass = new NewsCardList(constants.preloader, constants.nothingFound);
const headerClass = new Header(constants.nonAuthHeader, constants.authHeader, constants.logoutButton, constants.userName);
const popupClass = new Popup(constants.body, constants.popup, mainApiClass);
let statement = false
let userID;

statement = !!localStorage.getItem('jwt');

function clearRenderFunc(source) {
  source.childNodes.forEach((item) => {
    newsCardClass.clearRender(item)
  })
}

window.onload = function () {
  if (statement) {
    mainApiClass.getUserData(localStorage.getItem('jwt'))
      .then((res) => {
        userID = res.data.name;
        headerClass.render(statement, userID);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

constants.mobileMenuButton.addEventListener('click', (event) => {
  event.target.parentElement.classList.toggle('mobile-header');
  constants.mobileHeader.classList.toggle('disabled');
  if (statement) {
    constants.mobileHeaderLoginButton.textContent = userID
    constants.mobileHeaderLoginButton.addEventListener('click', () => {
      localStorage.removeItem('jwt');
      location.reload()
    })
  } else {
    constants.mobileHeaderLoginButton.addEventListener('click', (event) => {
      constants.mobileMenuButton.classList.add('disabled');
      constants.mobileHeader.classList.add('disabled');
      popupClass.open()
    })
  }
})

constants.loginButton.addEventListener('click', () => {
  popupClass.open()
})

constants.searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  clearRenderFunc(constants.cardContainer)
  newsCardListClass.renderError()
  newsCardListClass.renderLoader('on')

  let searchInput = event.target[0].value;
  newsAPIClass.getNews(searchInput, constants.today().toString(), constants.weekago().toString())
    .then((res) => {
      clearRenderFunc(constants.cardContainer)
      newsCardListClass.renderLoader()
      if (res.totalResults === 0) {
        clearRenderFunc(constants.cardContainer)
        newsCardListClass.renderError('empty')
      } else {
        clearRenderFunc(constants.cardContainer)
        if (res.articles.length <= 3) {
          res.articles.forEach((item) => {
            newsCardClass.render(newsCardListClass.renderResults(item, searchInput, popupClass, mainApiClass));
            document.querySelector('.results__button-more').classList.add('disabled');
          })
        } else {
          document.querySelector('.results__button-more').classList.remove('disabled');
          let counter = 0
          let max = 3
          for (counter; counter < max; counter++) {
            newsCardClass.render(newsCardListClass.renderResults(res.articles[counter], searchInput, popupClass, mainApiClass));
          }
          document.querySelector('.results__button-more').addEventListener('click', () => {
            if (max >= res.articles.length) {
              document.querySelector('.results__button-more').classList.add('disabled');
            }
            counter = counter + 3;
            max = max + 6;
            for (counter; counter < max; counter++) {
              newsCardClass.render(newsCardListClass.renderResults(res.articles[counter], searchInput, popupClass, mainApiClass));
            }
          })
        }
      }
      constants.preloader.classList.add('disabled')
    })
    .catch(() => {
      clearRenderFunc(constants.cardContainer)
      newsCardListClass.renderLoader()
      newsCardListClass.renderError('server')
    })
})
