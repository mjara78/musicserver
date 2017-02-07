//
// Define ArtistNotFoundError
//
function ArtistNotFoundError () {
    this.message = 'Artist not found.' ;
    this.name = "ArtistNotFoundError";
    this.code = 3000;
    this.statusCode = 404;
    Error.captureStackTrace(this, ArtistNotFoundError);
}
ArtistNotFoundError.prototype = Object.create(Error.prototype);
ArtistNotFoundError.prototype.constructor = ArtistNotFoundError;

exports.ArtistNotFoundError = ArtistNotFoundError;
