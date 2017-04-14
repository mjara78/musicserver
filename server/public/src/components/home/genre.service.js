class GenreService {  
  constructor ($http) {
    this.$http = $http
  }

  getGenres () {
    return this.$http.get('/api/genres').then(response => response.data)
  }

  getGenre (id) {
    return this.$http.get(`/api/genres/${id}`).then(response => response.data)
  }
}

GenreService.$inject = ['$http']

export default GenreService