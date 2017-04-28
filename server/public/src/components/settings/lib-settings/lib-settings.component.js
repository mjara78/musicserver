import controller from './lib-settings.controller'

export const LibSettingsComponent = {  
  bindings: { 
  	library: "<"
  	},
  require: { parent: "^msApp"},
  controller,
  templateUrl: 'src/components/settings/lib-settings/lib-settings.component.html'
}
