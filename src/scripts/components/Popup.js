import { signInData, signUpData } from '../constants/mainConstants'

export default class Popup {
  static _signinPopup = document.querySelector('.signin-popup').content;
  static _signupPopup = document.querySelector('.signup-popup').content;
  static _succefulPopup = document.querySelector('.succeful-popup').content;

  constructor(body, popup, MainApiClass) {
    this.MainApiClass = MainApiClass
    this.body = body;
    this.popup = popup;
  }

  setContent(state) {
    if (state === 'signin') {
      const view = Popup._signinPopup.cloneNode(true).children[0];
      view.querySelector('.close-button').addEventListener('click', () => {
        this.close()
      })
      view.querySelector('.popup__link').addEventListener('click', () => {
        this.clearContent();
        this.setContent('signup')
      })
      view.querySelector('.popup__signin-form').addEventListener('submit', (event) => {
        event.preventDefault();
        signInData['email'] = event.target[0].value;
        signInData['password'] = event.target[1].value;
        this.MainApiClass.signin(signInData)
          .then((res) => {
            localStorage.setItem('jwt', res.token);
            document.location.reload();
          })
          .catch((err) => {
            console.log(err)
          })
      })
      this.render(view)
    } else if (state === 'signup') {
      const view = Popup._signupPopup.cloneNode(true).children[0];
      view.querySelector('.close-button').addEventListener('click', () => {
        this.close()
      })
      view.querySelector('.popup__link').addEventListener('click', () => {
        this.clearContent();
        this.setContent('signin')
      })
      view.querySelector('.popup__signin-form').addEventListener('submit', (event) => {
        event.preventDefault()
        signUpData['email'] = event.target[0].value;
        signUpData['password'] = event.target[1].value;
        signUpData['name'] = event.target[2].value
        this.MainApiClass.signup(signUpData)
          .then((res) => {
            localStorage.setItem('jwt', res.token);
            this.clearContent();
            this.setContent('success')
          })
      })
      this.render(view)
    } else if (state === 'success') {
      const view = Popup._succefulPopup.cloneNode(true).children[0];
      view.querySelector('.close-button').addEventListener('click', () => {
        this.close()
      })
      view.querySelector('.popup__signup-success-button').addEventListener('click', () => {
        this.clearContent();
        this.setContent('signin')
      })
      this.render(view)
    }
  }

  clearContent() {
    this.popup.removeChild(this.popup.children[0])
  }

  render(view) {
    this.popup.appendChild(view)
  }

  open() {
    this.body.classList.add('overflow');
    this.popup.classList.remove('disabled')
    this.setContent('signin')
  }

  close() {
    this.clearContent()
    this.body.classList.remove('overflow');
    this.popup.classList.add('disabled')
  }
}
