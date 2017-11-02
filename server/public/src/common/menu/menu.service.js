
class MenuService {  
  constructor ($http) { "ngInject";
    this.$http = $http
    this.selectedOpt = {}
  }

  getMenuOptions () {
    return this.$http.get('/src/common/menu/menu.json').then(response => response.data)
  }

    selectMenuOpt (option,label){
			this.selectedOpt = {
						name: option ,
						label: label
			}
	}
}

export default MenuService