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

function SongFileNotFoundError (message) {
    this.message = 'Song file not found:' + message;
    this.name = "SongFileNotFoundError";
    this.code = 5010;
    this.statusCode = 418;
    Error.captureStackTrace(this, SongFileNotFoundError);
}
SongFileNotFoundError.prototype = Object.create(Error.prototype);
SongFileNotFoundError.prototype.constructor = SongFileNotFoundError;

exports.SongFileNotFoundError = SongFileNotFoundError;