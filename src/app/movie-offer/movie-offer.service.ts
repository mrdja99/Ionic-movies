/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie-model';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';



interface MovieData {
  title: string;
  synopsys: string;
  imageUrl: string;
  director: string;
  actors: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieOfferService {

  private _movies = new BehaviorSubject<Movie[]>([]);
  private _yourMovies = new BehaviorSubject<Movie[]>([]);
  private _favorites = new BehaviorSubject<Movie[]>([]);
  private _watchlist = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get movies() {
    return this._movies.asObservable();
  }

  get yourMovies() {
    return this._yourMovies.asObservable();
  }

  get favorites() {
    return this._favorites.asObservable();
  }

  get watchlist() {
    return this._watchlist.asObservable();
  }


  addMovie(title: string, synopsys: string, imageUrl: string, director: string, actors: string) {

    let generatedId;
    let newMovie: Movie;
    let fetcheUserId: string;

    return this.authService.userId.pipe(take(1), switchMap(userId => {
      fetcheUserId = userId;
      return this.authService.token;

    }),
      take(1),
      switchMap((token) => {
        newMovie = new Movie(
          null,
          title,
          synopsys,
          director,
          actors,
          imageUrl,
          fetcheUserId
          );
          return this.http.post<{name: string}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/movies.json?auth=${token}`, newMovie);
      }),
      take(1),
      switchMap((resData) => {

        generatedId = resData.name;
        return this.movies;

      }),
          take(1),
          tap((movies) => {
            newMovie.id = generatedId;
            this._movies.next(movies.concat(newMovie));

          })

    );
  }

  getMovies() {


    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
        .get<{[key: string]: MovieData}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/movies.json?auth=${token}`
        );
      }),
      map((movieData) => {
        const movies: Movie[] = [];

        for(const key in movieData) {
          if(movieData.hasOwnProperty(key)){
            movies.push(new Movie(key, movieData[key].title, movieData[key].synopsys, movieData[key].director,movieData[key].actors,movieData[key].imageUrl,movieData[key].userId ));
        }
      }

      return movies;
      }),
      tap(movies => {
        console.log(movies);
        this._movies.next(movies);

      })

    );

    }

  getMovie(id: string) {
    return this.movies.pipe(map(movies => movies.find((m: Movie) => m.id === id)));
  }

  updateMovie(id: string, movieData: MovieData) {
    let updatedMovies: Movie[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        fetchedToken = token;
        return this.movies;
      }),
      take(1),
      switchMap((movies) => {
        if (!movies || movies.length <= 0) {
          return this.getMovies();
        } else {
          return of(movies);
        }
      }),
      switchMap((movies) => {
        const updatedMovieIndex = movies.findIndex(
          (m) => m.id === id
        );
        updatedMovies = [...movies];
        const oldMovie = updatedMovies[updatedMovieIndex];
        updatedMovies[updatedMovieIndex] = new Movie(
          id,
          movieData.title,
          movieData.synopsys,
          movieData.director,
          movieData.actors,
          movieData.imageUrl,
          oldMovie.userId
        );
        return this.http.put(
          `https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json?auth=${fetchedToken}`,
          { ...updatedMovies[updatedMovieIndex], id: null }
        );
      }),
      tap(() => {
        this._movies.next(updatedMovies);
      })
    );
  }


  deleteMovie(movieId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
        .delete(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/movies/${movieId}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.movies;
      }),
      take(1),
      tap((movies) => {
        const newMovie = movies.filter(
          (m) => m.id !== movieId
        );
        this._movies.next(newMovie);
      })
    );
  }

  addYourMovie(title: string, synopsys: string, imageUrl: string, director: string, actors: string) {

    let generatedId;
    let newMovie: Movie;
    let fetcheUserId: string;

    return this.authService.userId.pipe(take(1), switchMap(userId => {
      fetcheUserId = userId;
      return this.authService.token;

    }),
      take(1),
      switchMap((token) => {
        newMovie = new Movie(
          null,
          title,
          synopsys,
          director,
          actors,
          imageUrl,
          fetcheUserId
          );
          return this.http.post<{name: string}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/your-movies.json?auth=${token}`, newMovie);
      }),
      take(1),
      switchMap((resData) => {

        generatedId = resData.name;
        return this.yourMovies;

      }),
          take(1),
          tap((movies) => {
            newMovie.id = generatedId;
            this._yourMovies.next(movies.concat(newMovie));

          })
    );
  }

  getYourMovies() {

    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
        .get<{[key: string]: MovieData}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/your-movies.json?auth=${token}`
        );
      }),
      map((movieData) => {
        const movies: Movie[] = [];

        for(const key in movieData) {
          if(movieData.hasOwnProperty(key)){
            movies.push(new Movie(key, movieData[key].title, movieData[key].synopsys, movieData[key].director,movieData[key].actors,movieData[key].imageUrl,movieData[key].userId ));
        }
      }

      return movies;
      }),
      tap(movies => {
        console.log(movies);
        this._yourMovies.next(movies);

      })

    );

    }

    deleteYourMovie(movieId: string) {
      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http
          .delete(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/your-movies/${movieId}.json?auth=${token}`
          );
        }),
        switchMap(() => {
          return this.yourMovies;
        }),
        take(1),
        tap((movies) => {
          const newMovie = movies.filter(
            (m) => m.id !== movieId
          );
          this._yourMovies.next(newMovie);
        })
      );
    }

    addFavorites(title: string, synopsys: string, imageUrl: string, director: string, actors: string) {

      let generatedId;
      let newMovie: Movie;
      let fetcheUserId: string;

      return this.authService.userId.pipe(take(1), switchMap(userId => {
        fetcheUserId = userId;
        return this.authService.token;

      }),
        take(1),
        switchMap((token) => {
          newMovie = new Movie(
            null,
            title,
            synopsys,
            director,
            actors,
            imageUrl,
            fetcheUserId
            );
            return this.http.post<{name: string}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?auth=${token}`, newMovie);
        }),
        take(1),
        switchMap((resData) => {

          generatedId = resData.name;
          return this.favorites;

        }),
            take(1),
            tap((movies) => {
              newMovie.id = generatedId;
              this._favorites.next(movies.concat(newMovie));

            })
      );
    }

    getFavorites() {

      return this.authService.token.pipe(
        take(1),
        switchMap((token) => {
          return this.http
          .get<{[key: string]: MovieData}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/favorites.json?auth=${token}`
          );
        }),
        map((movieData) => {
          const movies: Movie[] = [];

          for(const key in movieData) {
            if(movieData.hasOwnProperty(key)){
              movies.push(new Movie(key, movieData[key].title, movieData[key].synopsys, movieData[key].director,movieData[key].actors,movieData[key].imageUrl,movieData[key].userId ));
          }
        }

        return movies;
        }),
        tap(movies => {
          console.log(movies);
          this._favorites.next(movies);

        })

      );

      }

      deleteFavoriteMovie(movieId: string) {
        return this.authService.token.pipe(
          take(1),
          switchMap((token) => {
            return this.http
            .delete(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/favorites/${movieId}.json?auth=${token}`
            );
          }),
          switchMap(() => {
            return this.favorites;
          }),
          take(1),
          tap((movies) => {
            const newMovie = movies.filter(
              (m) => m.id !== movieId
            );
            this._favorites.next(newMovie);
          })
        );
      }

      addWatchlist(title: string, synopsys: string, imageUrl: string, director: string, actors: string) {

        let generatedId;
        let newMovie: Movie;
        let fetcheUserId: string;

        return this.authService.userId.pipe(take(1), switchMap(userId => {
          fetcheUserId = userId;
          return this.authService.token;

        }),
          take(1),
          switchMap((token) => {
            newMovie = new Movie(
              null,
              title,
              synopsys,
              director,
              actors,
              imageUrl,
              fetcheUserId
              );
              return this.http.post<{name: string}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/watchlist.json?auth=${token}`, newMovie);
          }),
          take(1),
          switchMap((resData) => {

            generatedId = resData.name;
            return this.watchlist;

          }),
              take(1),
              tap((movies) => {
                newMovie.id = generatedId;
                this._watchlist.next(movies.concat(newMovie));

              })
        );
      }

      getWatchlist() {

        return this.authService.token.pipe(
          take(1),
          switchMap((token) => {
            return this.http
            .get<{[key: string]: MovieData}>(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/watchlist.json?auth=${token}`
            );
          }),
          map((movieData) => {
            const movies: Movie[] = [];

            for(const key in movieData) {
              if(movieData.hasOwnProperty(key)){
                movies.push(new Movie(key, movieData[key].title, movieData[key].synopsys, movieData[key].director,movieData[key].actors,movieData[key].imageUrl,movieData[key].userId ));
            }
          }

          return movies;
          }),
          tap(movies => {
            console.log(movies);
            this._watchlist.next(movies);

          })

        );

        }

        deleteWatchlistMovie(movieId: string) {
          return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
              return this.http
              .delete(`https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/watchlist/${movieId}.json?auth=${token}`
              );
            }),
            switchMap(() => {
              return this.watchlist;
            }),
            take(1),
            tap((movies) => {
              const newMovie = movies.filter(
                (m) => m.id !== movieId
              );
              this._watchlist.next(newMovie);
            })
          );
        }

}


