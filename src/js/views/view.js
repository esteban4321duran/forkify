import icons from 'url:../../img/icons.svg';
import { mergeTextContent } from '../helpers.js';
export default class View {
  _parentElement;
  _data;

  _render() {
    const markup = this._generateMarkup(this._data);
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }
  /**
   * @override
   */
  _generateMarkup() {}
  //public API
  /**
   * Update application state data related to the UI for the different child views.
   * Then, render/re-render and insert the UI markup
   * @param {Object | Object[]} data Data to be updated and rendered. The data received depends on the child view that calls the method
   * @returns {undefined}
   * @this {Object} View child class instance
   * @author Esteban Duran
   */
  updateAndRender(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      //check if there was no data for the requested query
      this.renderError();
      return;
    }
    this._data = data;
    this._render();
  }
  /**
   * Update application state data related to the UI for the different child views.
   * Then, re-render only the markup whose related data was updated.
   * @param {Object | Object[]} data Data to be updated and rendered. The data received depends on the child view that calls the method
   */
  updateAndMergeHTML(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);
    mergeTextContent(newMarkup, this._parentElement);
  }
  renderSpiner() {
    const markup = `
		<div class="spinner">
			<svg>
				<use href="${icons}#icon-loader"></use>
			</svg>
		</div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError() {} //override
  renderMessage(message = this._message) {
    const markup = `<div class="recipe">
		<div class="message">
			<div>
				<svg>
					<use href="${icons}#icon-smile"></use>
				</svg>
			</div>
			<p>${message}</p>
    </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
