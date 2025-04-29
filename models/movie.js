export class MovieModel {
  static getAll({ genre }) {
    if (genre) {
      return moviesRouter.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase)
      )
    }
  }
}
