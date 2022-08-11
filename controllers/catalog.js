const CatalogDAO = require("../models/catalogDAO");

class CatalogController {
  static async getCountries(req, res, next) {
    const countries = await CatalogDAO.getCountries();

    res.json({
      countries,
    });
  }

  static async getCastMembers(req, res, next) {
    const castMembers = await CatalogDAO.getCastMembers();

    res.json({
      castMembers,
    });
  }

  static async getGenres(req, res, next) {
    const genres = await CatalogDAO.getGenres();

    res.json({
      genres,
    });
  }
}

module.exports = CatalogController;
