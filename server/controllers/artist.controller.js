//
// Artist Controller
//

var ArtistDao = require("../models/dao/artistDao");
const GenericController = require("./generic.controller");

module.exports = class AlbumController extends GenericController {
    constructor() {
      super(new ArtistDao())
    }
}  

