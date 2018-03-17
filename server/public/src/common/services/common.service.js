class CommonService {  
  constructor () { "ngInject";

  }
  
  getHumanTime(time) {
      function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
      }

      var min = (time / 60) << 0,
           sec = Math.round( time % 60);
           
      if (min > 59){
        var hour = (min / 60) << 0,
            min = Math.round( min % 60)
        
        return pad(hour) + ':' + pad(min) + ':' + pad(sec)
      }

      return pad(min) + ':' + pad(sec)
  }
}

export default CommonService