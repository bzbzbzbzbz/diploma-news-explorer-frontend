export default class NewsApi {
  constructor(url) {
    this.url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getNews(keyword, date, pastDate) {
    return fetch(`${this.url}/top-headlines?q=${keyword}&from=${pastDate}&to=${date}&pageSize=100&apiKey=f4fd6869460d4dca914e5c01d2d53a50`)
      .then(res => {
        return this._getResponseData(res);
      })
  }
}
