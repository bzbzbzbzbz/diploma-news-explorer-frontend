export default class MainAPI {
  constructor(url) {
    this.url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  signup(data) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      credentials: 'include',
      SameSite: 'None',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  signin(data) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      credentials: 'include',
      SameSite: 'None',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  getUserData(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  getArticles(token) {
    return fetch(`${this.url}/articles`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  createArticle(data, token) {
    return fetch(`${this.url}/articles`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  removeArticle(id, token) {
    return fetch(`${this.url}/articles/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}
