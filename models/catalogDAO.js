let movies;
let mflix;

class CatalogDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      mflix = await conn.db(process.env.MFLIX_NS);
      movies = await conn.db(process.env.MFLIX_NS).collection("movies");
      this.movies = movies; // this is only for testing
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`
      );
    }
  }

  /**
   * Returns all the countries that appears in the
   * countries field.
   * Returns a list of string.
   * @returns {Promise<String[]>} A list with the countries.
   */
  static async getCountries() {
    const unwindStage = { $unwind: { path: "$countries" } };
    const groupStage = { $group: { _id: "$countries" } };
    const queryPipeline = [unwindStage, groupStage];

    try {
      const cursor = await movies.aggregate(queryPipeline);
      const countries = await cursor.toArray();

      return countries;
    } catch (e) {
      console.log(e.message);
      return { error: "Something went wrong" };
    }
  }

  /**
   * Returns all the cast members that appears in the
   * cast field.
   * Returns a list of string.
   * @returns {Promise<String[]>} A list with the cast members.
   */
  static async getCastMembers() {
    const unwindStage = { $unwind: { path: "$cast" } };
    const groupStage = { $sortByCount: "$cast" };
    const limitStage = { $limit: 25 };
    const projectStage = { $project: { count: 0 } };
    const queryPipeline = [unwindStage, groupStage, limitStage, projectStage];

    try {
      const cursor = await movies.aggregate(queryPipeline);
      const castMembers = await cursor.toArray();

      return castMembers;
    } catch (e) {
      console.log(e.message);
      return { error: "Something went wrong" };
    }
  }

  /**
   * Returns all the genres that appears in the
   * genre field.
   * Returns a list of string.
   * @returns {Promise<String[]>} A list with the genres.
   */
  static async getGenres() {
    const unwindStage = { $unwind: { path: "$genres" } };
    const groupStage = { $group: { _id: "$genres" } };
    const queryPipeline = [unwindStage, groupStage];

    try {
      const cursor = await movies.aggregate(queryPipeline);
      const genres = await cursor.toArray();

      return genres;
    } catch (e) {
      console.log(e.message);
      return { error: "Something went wrong" };
    }
  }
}

module.exports = CatalogDAO;
