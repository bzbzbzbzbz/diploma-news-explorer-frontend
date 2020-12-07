export default class NewsCard {
  constructor(body, cardPlace) {
    this.body = body;
    this.cardPlace = cardPlace;
  }

  render(data) {
    this.body.classList.remove('disabled');
    this.cardPlace.appendChild(data);
  }

  clearRender(item) {
    item.parentNode.removeChild(item)
    this.body.classList.add('disabled');
  }
}
