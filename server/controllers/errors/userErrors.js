//
// Define UserPassNotFound
//
function UserPassNotFound() {
    this.message = 'Password incorrect or user not found.';
    this.name = "UserPassNotFound";
    this.code = 6000;
    this.statusCode = 404;
    Error.captureStackTrace(this, UserPassNotFound);
}
UserPassNotFound.prototype = Object.create(Error.prototype);
UserPassNotFound.prototype.constructor = UserPassNotFound;

exports.UserPassNotFound = UserPassNotFound;

//
// Define UserNotFound
//
function UserNotFound() {
    this.message = 'User not found';
    this.name = "UserNotFound";
    this.code = 6404;
    this.statusCode = 404;
    Error.captureStackTrace(this, UserNotFound);
}
UserNotFound.prototype = Object.create(Error.prototype);
UserNotFound.prototype.constructor = UserNotFound;

exports.UserNotFound = UserNotFound;