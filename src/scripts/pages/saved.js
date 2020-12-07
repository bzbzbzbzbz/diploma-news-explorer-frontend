import "../../styles/index.css"
import MainAPI from "../API/MainAPI";
import * as constants from "../constants/savedConstants";
import NewsCard from "../components/NewsCard";
import NewsCardList from "../components/NewsCardList";
import Header from "../components/Header";

const MainApiClass = new MainAPI(constants.apiURL);
const NewsCardClass = new NewsCard(constants.cardBlock, constants.cardContainer)
const NewsCardListClass = new NewsCardList(constants.preloader, constants.nothingFound);
const HeaderClass = new Header(constants.nonAuthHeader, constants.authHeader, constants.logoutButton, constants.userName);

let statement = true
let userID;

constants.mobileMenuButton.addEventListener('click', (event) => {
  constants.mobileHeader.classList.toggle('disabled');
  constants.mobileHeaderLoginButton.textContent = userID
  constants.mobileHeaderLoginButton.addEventListener('click', () => {
    localStorage.removeItem('jwt');
    location.reload()
  })
})


window.onload = function () {
  if (localStorage.getItem('jwt')) {
    MainApiClass.getArticles(localStorage.getItem('jwt'))
      .then(res => {
        let sortedKeywordArray = []
        let sortedDataPack = []
        let keywordArray = res.data.map(v => v.keyword)
        let obj = {};
        keywordArray.forEach(v => !obj[v] ? obj[v] = 1 : obj[v]++);
        let words = Object.keys(obj).map(v => [Object.assign({}, res.data.find(c => c.keyword === v)), obj[v]]).sort((a,b) => b[1] - a[1]);
        words.forEach((item) => {
          sortedKeywordArray.push(item[0].keyword)
        })

        let wordCounter = 0

        while (wordCounter <= sortedKeywordArray.length) {
          res.data.forEach((item) => {
            if (item.keyword === sortedKeywordArray[wordCounter]) {
              sortedDataPack.push(item)
            }
          })
          wordCounter++
        }

        if (sortedKeywordArray.length > 3) {
          constants.firstKeyword.textContent = sortedKeywordArray[0]
          constants.secondKeyword.textContent = sortedKeywordArray[1]
          constants.thirdKeyword.classList.add('disabled')
          constants.fourthKeyword.classList.remove('disabled')
          constants.fourthKeyword.textContent = sortedKeywordArray.length - 2 + '-м другим'
        } else
        if (sortedKeywordArray.length === 1) {
          constants.firstKeyword.textContent = sortedKeywordArray[0]
          constants.secondKeyword.classList.add('disabled')
          constants.thirdKeyword.classList.add('disabled')
          constants.fourthKeyword.classList.add('disabled')
        } else if (sortedKeywordArray.length === 2) {
          constants.firstKeyword.textContent = sortedKeywordArray[0]
          constants.secondKeyword.textContent = sortedKeywordArray[1]
          constants.thirdKeyword.classList.add('disabled')
          constants.fourthKeyword.classList.add('disabled')
        } else if (sortedKeywordArray.length === 3) {
          constants.firstKeyword.textContent = sortedKeywordArray[0]
          constants.secondKeyword.textContent = sortedKeywordArray[1]
          constants.thirdKeyword.textContent = sortedKeywordArray[2]
          constants.fourthKeyword.classList.add('disabled')
        }

        if (sortedDataPack.length === 0) {
          constants.savedArticles.textContent = `у вас ещё нет сохраненных статей`
          constants.keywords.classList.add('disabled')
        }
        else if (sortedDataPack.length === 1) {
          constants.cardBlock.classList.remove('disabled')
          constants.savedArticles.textContent = `у вас 1 сохранённая статья`;
          NewsCardClass.render(NewsCardListClass.renderResults(res.data[0], 'hello', 'empty', MainApiClass))
        }
        else {
          constants.savedArticles.textContent = `у вас ${res.data.length} сохранённых статей`;
          sortedDataPack.forEach((item) => {
            constants.cardBlock.classList.remove('disabled')
            NewsCardClass.render(NewsCardListClass.renderResults(item, 'hello', 'empty', MainApiClass))
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    MainApiClass.getUserData(localStorage.getItem('jwt'))
      .then((res) => {
        userID = res.data.name;
        constants.savedUserName.textContent = res.data.name;
        HeaderClass.render(statement, userID);
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    location.replace('/index.html')
  }
}
