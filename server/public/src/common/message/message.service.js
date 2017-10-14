
class MessageService {  
  constructor($mdToast) {
    this.toast = $mdToast
  }

  showMessage(text, delay) {
    if (!delay) {
    	delay = 3000;
    }
    this.toast.show(
      this.toast.simple()
        .textContent(text)
        .hideDelay(delay)
      );
  };
   
  showMessageError(error) {
    this.toast.show(
      this.toast.simple()
        .textContent('Error: '+error.message)
        .hideDelay(6000)
      );
  }
}

MessageService.$inject = ['$mdToast']

export default MessageService