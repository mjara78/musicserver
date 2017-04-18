//
// Define LibraryNotBaseDirError
//
function LibraryNotBaseDirError () {
    this.message = 'basedir not defined.';
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
function LibraryRefreshingError () {
    this.message = 'Library already in refresh process, wait until finish.';
    this.name = "LibraryRefreshingError";
    this.code = 1002;
    this.statusCode = 418;
    Error.captureStackTrace(this, LibraryRefreshingError);
}
LibraryRefreshingError.prototype = Object.create(Error.prototype);
LibraryRefreshingError.prototype.constructor = LibraryRefreshingError;

exports.LibraryRefreshingError = LibraryRefreshingError;

//
// Define LibraryNotFoundError
//
function LibraryNotFoundError () {
    this.message = 'Library not found';
    this.name = "LibraryNotFoundError";
    this.code = 1003;
    this.statusCode = 404;
    Error.captureStackTrace(this, LibraryNotFoundError);
}
LibraryNotFoundError.prototype = Object.create(Error.prototype);
LibraryNotFoundError.prototype.constructor = LibraryNotFoundError;

exports.LibraryNotBaseDirError = LibraryNotBaseDirError;
