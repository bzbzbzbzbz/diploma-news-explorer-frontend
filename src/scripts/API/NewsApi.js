export default class NewsApi {
  constructor(url, token) {
    this.url = url;
    this.token = token
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getNews(keyword, date, pastDate) {
    return fetch(`${this.url}/top-headlines?q=${keyword}&from=${pastDate}&to=${date}&pageSize=100&apiKey=${this.token}`, {
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}
