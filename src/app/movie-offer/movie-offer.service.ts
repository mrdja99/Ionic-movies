/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movie-model';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private http: HttpClient, private authService: AuthService) { }

  get movies() {
    return this._movies.asObservable();
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

}


