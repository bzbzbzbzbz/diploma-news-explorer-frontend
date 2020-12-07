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
const MainApiClass = new MainAPI(constants.apiURL);
const NewsAPIClass = new NewsApi(constants.newsURL);
const NewsCardClass = new NewsCard(constants.cardBlock, constants.cardContainer)
const NewsCardListClass = new NewsCardList(constants.preloader, constants.nothingFound);
const HeaderClass = new Header(constants.nonAuthHeader, constants.authHeader, constants.logoutButton, constants.userName);
const PopupClass = new Popup(constants.body, constants.popup, MainApiClass);
let statement = false
let userID;

if (localStorage.getItem('jwt')) {
  statement = true;
} else {
  statement = false;
}

function clearRenderFunc(source) {
  source.childNodes.forEach((item) => {
    NewsCardClass.clearRender(item)
  })
}

window.onload = function () {
  if (statement) {
    MainApiClass.getUserData(localStorage.getItem('jwt'))
      .then((res) => {
        userID = res.data.name;
        HeaderClass.render(statement, userID);
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
      PopupClass.open()
    })
  }
})

constants.loginButton.addEventListener('click', () => {
  PopupClass.open()
})

constants.searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  clearRenderFunc(constants.cardContainer)
  NewsCardListClass.renderError()
  NewsCardListClass.renderLoader('on')

  let searchInput = event.target[0].value;
  NewsAPIClass.getNews(searchInput, constants.today().toString(), constants.weekago().toString())
    .then((res) => {
      clearRenderFunc(constants.cardContainer)
      NewsCardListClass.renderLoader()
      if (res.totalResults === 0) {
        clearRenderFunc(constants.cardContainer)
        NewsCardListClass.renderError('empty')
      } else {
        clearRenderFunc(constants.cardContainer)
        if (res.articles.length <= 3) {
          res.articles.forEach((item) => {
            NewsCardClass.render(NewsCardListClass.renderResults(item, searchInput, PopupClass, MainApiClass));
            document.querySelector('.results__button-more').classList.add('disabled');
          })
        } else {
          document.querySelector('.results__button-more').classList.remove('disabled');
          let counter = 0
          let max = 3
          for (counter; counter < max; counter++) {
            NewsCardClass.render(NewsCardListClass.renderResults(res.articles[counter], searchInput, PopupClass, MainApiClass));
          }
          document.querySelector('.results__button-more').addEventListener('click', () => {
            if (max >= res.articles.length) {
              document.querySelector('.results__button-more').classList.add('disabled');
            }
            counter = counter + 3;
            max = max + 6;
            console.log(counter, max)
            for (counter; counter < max; counter++) {
              NewsCardClass.render(NewsCardListClass.renderResults(res.articles[counter], searchInput, PopupClass, MainApiClass));
            }
          })
        }
      }
      constants.preloader.classList.add('disabled')
    })
    .catch(() => {
      clearRenderFunc(constants.cardContainer)
      NewsCardListClass.renderLoader()
      NewsCardListClass.renderError('server')
    })
})
