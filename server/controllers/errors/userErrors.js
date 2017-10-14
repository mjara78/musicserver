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