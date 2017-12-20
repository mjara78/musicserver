
class MessageService {  
  constructor($mdToast) { "ngInject";
    this.$mdToast = $mdToast
  }

  showMessage(text, delay) {
    if (!delay) {
    	delay = 3000;
    }
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(text)
        .hideDelay(delay)
      );
  };
   
  showMessageError(error) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('ERROR: '+ error.message)
        .hideDelay(6000)
      );
  }
}

export default MessageService