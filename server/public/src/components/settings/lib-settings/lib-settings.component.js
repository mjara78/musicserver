import controller from './lib-settings.controller'

export const LibSettingsComponent = {  
  bindings: { 
   	library: "<",
   	$transition$: '<' 
  	},
  	require: {
      parent: '^^msApp'
   },
  controller,
  templateUrl: 'src/components/settings/lib-settings/lib-settings.component.html'
}
