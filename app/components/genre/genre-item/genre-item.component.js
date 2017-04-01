export const GenreItemComponent = {  
  bindings: {
    data: '<',
  },
  template: `
    <li class="collection-item avatar" style="border-bottom: 1px solid #cccccc;">
      <span class="title">{{$ctrl.data.name}}</span>
      <p><a ng-href="#/genres/{{$ctrl.data.id}}">Detalle</a></p>
    </li>
  `
}