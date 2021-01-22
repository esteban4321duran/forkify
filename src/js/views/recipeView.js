import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './view.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = `We couldn't find that recipe :(\nPlease try another one`;
  _message = '';

  _generateMarkup(recipe) {
    return `
		<figure class="recipe__fig">
			<img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
			<h1 class="recipe__title">
				<span>${recipe.title}</span>
			</h1>
		</figure>

		<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="${icons}#icon-clock"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
				<span class="recipe__info-text">minutes</span>
			</div>
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="${icons}#icon-users"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
				<span class="recipe__info-text">servings</span>

				<div class="recipe__info-buttons">
					<button class="btn--tiny btn--increase-servings" data-type="decrease">
						<svg>
							<use href="${icons}#icon-minus-circle"></use>
						</svg>
					</button>
					<button class="btn--tiny btn--increase-servings" data-type="increase">
						<svg>
							<use href="${icons}#icon-plus-circle"></use>
						</svg>
					</button>
				</div>
			</div>

			<div class="recipe__user-generated ${recipe.key ? '' : 'hidden'}">
				<svg>
					<use href="${icons}#icon-user"></use>
				</svg>
			</div>
			<button class="btn--round">
				<svg class="">
					<use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
				</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<h2 class="heading--2">Recipe ingredients</h2>
			<ul class="recipe__ingredient-list">
				${recipe.ingredients.map(ing => this._generateIngredientsMarkup(ing)).join('')}
			</ul>
		</div>

		<div class="recipe__directions">
			<h2 class="heading--2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__publisher">${recipe.publisher}</span>. Please check out
				directions at their website.
			</p>
			<a
				class="btn--small recipe__btn"
				href="${recipe.source}"
				target="_blank"
			>
				<span>Directions</span>
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-right"></use>
				</svg>
			</a>
		</div>
`;
  }
  _generateIngredientsMarkup(ing) {
    return `
		<li class="recipe__ingredient">
			<svg class="recipe__icon">
				<use href="${icons}#icon-check"></use>
			</svg>
			<div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
			<div class="recipe__description">
				<span class="recipe__unit">${ing.unit}</span>
				${ing.description}
			</div>
		</li>`;
  }

  // Public API

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
		<div>
			<svg>
				<use href="src/img/${icons}.svg#icon-alert-triangle"></use>
			</svg>
		</div>
		<p>${message}</p>
	</div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //This method is part of the public API of the class because it needs to be called by the controller
  //for it to subscribe to events
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(windowEvent =>
      window.addEventListener(windowEvent, handler)
    );
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const clickedButton = e.target.closest('.btn--tiny');
      handler(clickedButton);
    });
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const bookmarkButton = e.target.closest('.btn--round');
      handler(bookmarkButton);
    });
  }
}

export default new RecipeView();
