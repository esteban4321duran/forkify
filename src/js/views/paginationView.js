import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  // _render() {
  //   const markup = this._generateMarkup(this._data);
  //   this._parentElement.insertAdjacentHTML('beforeend', markup);
  // }
  _generateMarkup(resultsData) {
    const page = resultsData.page;
    const pageAmount = Math.ceil(
      resultsData.results.length / resultsData.resultsPerPage
    );
    //case: page 1, more than 1 page
    if (page === 1 && pageAmount > 1) {
      return this._generatePaginationMarkup(page, 'next');
    }
    if (page === pageAmount && pageAmount > 1) {
      //case: last page
      return this._generatePaginationMarkup(page, 'prev');
    }
    //case: page 1, only 1 page
    if (pageAmount === 1) {
      return this._generatePaginationMarkup(page, 'none');
    }
    //case: other page
    if (page < pageAmount) {
      return this._generatePaginationMarkup(page, 'both');
    }
  }
  _generatePaginationMarkup(page, type) {
    let markup = '';
    if (type === 'prev') {
      markup += `
		<button class="btn--inline pagination__btn--prev">
			<svg class="search__icon">
				<use href="${icons}#icon-arrow-left"></use>
			</svg>
			<span>Page ${page - 1}</span>
		</button>
		`;
    }
    if (type === 'next') {
      markup += `<button class="btn--inline pagination__btn--next">
				<span>Page ${page + 1}</span>
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
				</svg>
			</button> `;
    }
    if (type === 'both') {
      markup += `
		<button class="btn--inline pagination__btn--prev">
			<svg class="search__icon">
				<use href="${icons}#icon-arrow-left"></use>
			</svg>
			<span>Page ${page - 1}</span>
		</button>
		<button class="btn--inline pagination__btn--next">
				<span>Page ${page + 1}</span>
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
				</svg>
			</button>
			`;
    }
    if (type === 'none') markup = '';
    return markup;
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clickedButton = e.target.closest('.btn--inline');
      handler(clickedButton);
    });
  }
}

export default new PaginationView();
