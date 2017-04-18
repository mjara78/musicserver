//
// Define ServerError
//
function ServerError (message) {
    this.message = message;
    this.name = "ServerError";
    this.code = 0500;
    this.statusCode = 500;
    Error.captureStackTrace(this, ServerError);
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

exports.ServerError = ServerError;
