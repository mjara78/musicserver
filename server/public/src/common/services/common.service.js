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

  /**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
 shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
  } 
}


export default CommonService