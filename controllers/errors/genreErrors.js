//
// Define GenreNotFoundError
//
function GenreNotFoundError (message) {
    this.message = 'Genre not found.' + message;
    this.name = "GenreNotFoundError";
    this.code = 2000;
    this.statusCode = 404;
    Error.captureStackTrace(this, GenreNotFoundError);
}
GenreNotFoundError.prototype = Object.create(Error.prototype);
GenreNotFoundError.prototype.constructor = GenreNotFoundError;

exports.GenreNotFoundError = GenreNotFoundError;
