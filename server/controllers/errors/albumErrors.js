//
// Define AlbumNotFoundError
//
function AlbumNotFoundError () {
    this.message = 'Album not found.' ;
    this.name = "AlbumNotFoundError";
    this.code = 4000;
    this.statusCode = 404;
    Error.captureStackTrace(this, AlbumNotFoundError);
}
AlbumNotFoundError.prototype = Object.create(Error.prototype);
AlbumNotFoundError.prototype.constructor = AlbumNotFoundError;

exports.AlbumNotFoundError = AlbumNotFoundError;
