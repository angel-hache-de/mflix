const { Router } = require("express");
const CatalogController = require("../controllers/catalog");

const router = new Router();

router.route("/countries").get(CatalogController.getCountries);
router.route("/cast").get(CatalogController.getCastMembers);
router.route("/genres").get(CatalogController.getGenres);

module.exports = router;
