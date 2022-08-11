const { Router } = require("express");
const MoviesCtrl = require("../controllers/movies");
const { validateQueryParams } = require("../middlewares/validateQueryParams");

const router = new Router();

// associate put, delete, and get(id)
router.route("/").get(MoviesCtrl.apiGetMovies);
router.route("/search").get(MoviesCtrl.apiSearchMovies);
router.route("/countries").get(MoviesCtrl.apiGetMoviesByCountry);
router.get("/facet-search", [validateQueryParams], MoviesCtrl.apiFacetedSearch);
router.route("/id/:id").get(MoviesCtrl.apiGetMovieById);
router.route("/config-options").get(MoviesCtrl.getConfig);

module.exports = router;
