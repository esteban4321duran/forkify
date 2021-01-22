import View from './view.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _inputElement = this._parentElement.querySelector('input');

  _clearInput() {
    this._inputElement.value = '';
    this._inputElement.blur();
  }
  //public API
  getQuery() {
    const query = this._inputElement.value;
    this._clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
