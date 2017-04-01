class GenreListController {  
  constructor(GenreService) {
    this.genreService = GenreService
    this.genres = [];
    this.loadData();
  }

  loadData () {
    this.genres = this.genreService.getGenres()
      .then( data => {
            this.genres = data;
    });
    
  } 
}

GenreListController.$inject = ['GenreService']

export default GenreListController