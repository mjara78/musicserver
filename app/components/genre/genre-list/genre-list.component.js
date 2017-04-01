import controller from './genre-list.controller'

export const GenreListComponent = {  
  bindings: {
    genres: '<'
  },
  controller,
  template: `
    <ul class="collection">
      <genre-item ng-repeat="genre in $ctrl.genres" data="genre">
      </genre-item>
    </ul>
  `
}