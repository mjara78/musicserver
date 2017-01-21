//
// Define GenreNotFoundError
//
function GenreNotFoundError () {
    this.message = 'Genre not found.' ;
    this.name = "GenreNotFoundError";
    this.code = 2000;
    this.statusCode = 404;
    Error.captureStackTrace(this, GenreNotFoundError);
}
GenreNotFoundError.prototype = Object.create(Error.prototype);
GenreNotFoundError.prototype.constructor = GenreNotFoundError;

exports.GenreNotFoundError = GenreNotFoundError;
