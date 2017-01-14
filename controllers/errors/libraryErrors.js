//
// Define LibraryNotBaseDirError
//
function LibraryNotBaseDirError (message) {
    this.message = 'basedir not defined.' + message;
    this.name = "LibraryNotBaseDirError";
    this.code = 1001;
    this.statusCode = 418;
    Error.captureStackTrace(this, LibraryNotBaseDirError);
}
LibraryNotBaseDirError.prototype = Object.create(Error.prototype);
LibraryNotBaseDirError.prototype.constructor = LibraryNotBaseDirError;

exports.LibraryNotBaseDirError = LibraryNotBaseDirError;

//
// Define LibraryRefreshingError
//
function LibraryRefreshingError (message) {
    this.message = 'Library already in refresh process, wait until finish.' + message;
    this.name = "LibraryRefreshingError";
    this.code = 1002;
    this.statusCode = 418;
    Error.captureStackTrace(this, LibraryRefreshingError);
}
LibraryRefreshingError.prototype = Object.create(Error.prototype);
LibraryRefreshingError.prototype.constructor = LibraryRefreshingError;

exports.LibraryRefreshingError = LibraryRefreshingError;