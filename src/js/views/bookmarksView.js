import View from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No Bookmarks yet. Find a nice recipe and bookmark it ;)`;

  _generateMarkup(resultsData) {
    return resultsData
      .map(result => this._generateResultMarkup(result))
      .join('');
  }
  _generateResultMarkup(result) {
    const currentId = window.location.hash.slice(1);

    return `
		<li class="preview">
			<a class="preview__link ${
        result.id === currentId ? 'preview__link--active' : ''
      }" href="#${result.id}">
				<figure class="preview__fig">
					<img src="${result.image}" alt="Test" />
				</figure>
				<div class="preview__data">
					<h4 class="preview__title">${result.title}</h4>
					<p class="preview__publisher">${result.publisher}</p>
					<div class="preview__user-generated">
						<svg>
							<use href="src/img/icons.svg#icon-user"></use>
						</svg>
					</div>
					<div class="recipe__user-generated ${result.key ? '' : 'hidden'}">
					<svg>
						<use href="${icons}#icon-user"></use>
					</svg>
				</div>
				</div>
			</a>
		</li>`;
  }
  //public API
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
		<div>
			<svg>
				<use href="${icons}#icon-alert-triangle"></use>
			</svg>
		</div>
		<p>${this._errorMessage}</p>
	</div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //On the controller we were trying to merge the new bookmarks HTML with some other bookmarks that were never loaded before. Because of that we will render our bookmarks right after they've been loaded from localStorage
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
