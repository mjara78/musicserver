import GenericResourceService from 'common/services/generic-resource.service'

class SongService extends GenericResourceService {  
  constructor (Restangular) { "ngInject";
    super(Restangular)
    
    this.resource = 'songs'
  } 
  
  updateUserInfo(data, idSong){
    return this.put(data, idSong, 'userinfo')
  }
}

export default SongService