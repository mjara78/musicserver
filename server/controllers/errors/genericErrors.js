//
// Define ServerError
//
function ServerError (message) {
    this.message = message;
    this.name = "ServerError";
    this.code = "0500";
    this.statusCode = 500;
    Error.captureStackTrace(this, ServerError);
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

exports.ServerError = ServerError;

//
// Define AccessDeniedError
//
function AccessDeniedError (message) {
    this.message = message;
    this.name = "AccessDeniedError";
    this.code = '0403';
    this.statusCode = 403;
    Error.captureStackTrace(this, AccessDeniedError);
}
AccessDeniedError.prototype = Object.create(Error.prototype);
AccessDeniedError.prototype.constructor = AccessDeniedError;

exports.AccessDeniedError = AccessDeniedError;

//
// Define UnauthorizedAccessError
//
function UnauthorizedAccessError (message) {
    this.message = message;
    this.name = "UnauthorizedAccessError";
    this.code = '0401';
    this.statusCode = 401;
    Error.captureStackTrace(this, UnauthorizedAccessError);
}
UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

exports.UnauthorizedAccessError = UnauthorizedAccessError;
