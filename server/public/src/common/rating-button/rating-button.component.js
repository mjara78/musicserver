import controller from './rating-button.controller.js';
//import './rating-button.scss';

export const RatingButtonComponent = { 
	bindings: {
		ratingType: "@",
		song: "<",
		onRatingChange: "&"
	}, 
	controller,
 templateUrl: 'src/common/rating-button/rating-button.component.html'
}