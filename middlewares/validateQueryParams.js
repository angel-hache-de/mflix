/**
 * Limit of filters is 3 per filter
 */
const MAX_FILTER_SIZE = 3;
const validateQueryParams = (req, res, next) => {
  let { cast, countries, genres } = req.query;
  console.log("====================================");
  console.log(req.query);
  console.log("====================================");
  //   If no params are provided, then return all the movies
  req.fetchAllMovies = false;
  if (!req.query || (!cast && !countries && !genres)) {
    req.fetchAllMovies = true;
    return next();
  }

  try {
    if (cast) cast = cast.split(",");

    if (countries) countries = countries.split(",");

    if (genres) genres = genres.split(",");

    if (
      (cast && cast.length > MAX_FILTER_SIZE) ||
      (countries && countries.length > MAX_FILTER_SIZE) ||
      (genres && genres.length > MAX_FILTER_SIZE)
    )
      return res.status(400).json({
        error: {
          message: "max size 3 per filter",
        },
      });

    req.query.cast = cast;
    req.query.countries = countries;
    req.query.genres = genres;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: {
        message: "Invalid params",
      },
    });
  }
};

module.exports = { validateQueryParams };
