//
// Define SongNotFoundError
//
function SongNotFoundError () {
    this.message = 'Song not found.' ;
    this.name = "SongNotFoundError";
    this.code = 5000;
    this.statusCode = 404;
    Error.captureStackTrace(this, SongNotFoundError);
}
SongNotFoundError.prototype = Object.create(Error.prototype);
SongNotFoundError.prototype.constructor = SongNotFoundError;

exports.SongNotFoundError = SongNotFoundError;
