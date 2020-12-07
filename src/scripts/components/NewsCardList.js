export default class NewsCardList {
  static _cardItem = document.querySelector('.card_template').content;

  constructor(preloader, error) {
    this.preloader = preloader;
    this.error = error;
  }

  renderResults(data, keyword, popupClass, mainApiClass) {

    const view = NewsCardList._cardItem.cloneNode(true).children[0];

    if (location.pathname.includes('saved')) {
      const pubDate = new Date(data.date);

      function localeDate(currentDate) {
        const date = currentDate.toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
        })
        let year = currentDate.getFullYear();
        return date + ', ' + year
      }
      localeDate(pubDate)

      view.querySelector('.results__card-date').textContent = localeDate(pubDate);
      view.querySelector('.results__card-image').setAttribute('src', data.image);
      view.querySelector('.results__card-title').textContent = data.title;
      view.querySelector('.results__card-text').textContent = data.text;
      view.querySelector('.results__card-source').textContent = data.source;
      view.querySelector('.results__card-keyword').textContent = data.keyword;
      view.querySelector('.results__card-delete').addEventListener('click', (event) => {
        mainApiClass.removeArticle(data._id, localStorage.getItem('jwt'))
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err)
          })
      })
    } else {
      const dataPack = {
        keyword: keyword,
        title: data.title,
        text: data.description,
        date: data.publishedAt,
        source: data.source.name,
        link: data.url,
        image: data.urlToImage
      }

      const pubDate = new Date(data.publishedAt);

      function localeDate(currentDate) {
        const date = currentDate.toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
        })
        let year = currentDate.getFullYear();
        return date + ', ' + year
      }
      localeDate(pubDate)
      view.querySelector('.results__card-date').textContent = localeDate(pubDate);
      view.querySelector('.results__card-image').setAttribute('src', data.urlToImage);
      view.querySelector('.results__card-title').textContent = data.title;
      view.querySelector('.results__card-text').textContent = data.description;
      view.querySelector('.results__card-source').textContent = data.source.name;
      view.querySelector('.results__card-bookmark').addEventListener('click', (event) => {
        this.addCard(dataPack, event, mainApiClass)
      })
      if (!localStorage.getItem('jwt')) {
        view.querySelector('.results__card-bookmark-auth').classList.remove('disabled');
        view.querySelector('.results__card-bookmark-auth').addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          popupClass.open()
        })
      } else {
        view.querySelector('.results__card-bookmark-auth').classList.add('disabled');
      }
    }

    return view
  }

  renderLoader(state) {
    if (state === 'on') {
      this.preloader.classList.remove('disabled')
    } else {
      this.preloader.classList.add('disabled');
    }
  }

  renderError(state) {
    if (state === 'empty') {
      this.error.classList.remove('disabled')
      this.error.querySelector('.no-results__title').textContent = 'Ничего не найдено';
      this.error.querySelector('.no-results__text').textContent = 'К сожалению по вашему запросу ничего не найдено.'
    } else if (state === 'server') {
      this.error.classList.remove('disabled')
      this.error.querySelector('.no-results__title').textContent = 'Что-то пошло не так';
      this.error.querySelector('.no-results__text').textContent = 'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз'
    } else {
      this.error.classList.add('disabled')
    }

  }

  addCard(dataPack, event, mainApiClass) {
    mainApiClass.createArticle(dataPack, localStorage.getItem('jwt'))
      .then((res) => {
        event.target.classList.add('results__card-bookmark-saved')
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
