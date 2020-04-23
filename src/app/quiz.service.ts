import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {Quiz} from './entities/quiz';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizesUrl = 'api/quizes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getQuizes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizesUrl)
      .pipe(
        tap(_ => this.log('fetched quizes')),
        catchError(this.handleError<Quiz[]>('getQuizes', []))
      );
  }

  /** GET quiz by id. Return `undefined` when id not found */
  getQuizNo404<Data>(id: number): Observable<Quiz> {
    const url = `${this.quizesUrl}/?id=${id}`;
    return this.http.get<Quiz[]>(url)
      .pipe(
        map(quizes => quizes[0]), // returns a {0|1} element array
        tap(q => {
          const outcome = q ? `fetched` : `did not find`;
          this.log(`${outcome} quiz id=${id}`);
        }),
        catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
      );
  }

  /** GET quiz by id. Will 404 if id not found */
  getQuiz(id: number): Observable<Quiz> {
    const url = `${this.quizesUrl}/${id}`;
    return this.http.get<Quiz>(url).pipe(
      tap(_ => this.log(`fetched quiz id=${id}`)),
      catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
    );
  }

  /* GET quizes whose name contains search term */
  searchQuiz(term: string): Observable<Quiz[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Quiz[]>(`${this.quizesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found quizes matching "${term}"`) :
        this.log(`no quizes matching "${term}"`)),
      catchError(this.handleError<Quiz[]>('searchQuizes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new quiz to the server */
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizesUrl, quiz, this.httpOptions).pipe(
      tap((newQuiz: Quiz) => this.log(`added quiz w/ id=${newQuiz.id}`)),
      catchError(this.handleError<Quiz>('addQuiz'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteQuiz(quiz: Quiz | number): Observable<Quiz> {
    const id = typeof quiz === 'number' ? quiz : quiz.id;
    const url = `${this.quizesUrl}/${id}`;

    return this.http.delete<Quiz>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted quiz id=${id}`)),
      catchError(this.handleError<Quiz>('deleteQuiz'))
    );
  }

  /** PUT: update the quiz on the server */
  updateQuiz(quiz: Quiz): Observable<any> {
    return this.http.put(this.quizesUrl, quiz, this.httpOptions).pipe(
      tap(_ => this.log(`updated quiz id=${quiz.id}`)),
      catchError(this.handleError<any>('updateQuizes'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a QuizService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuizService: ${message}`);
  }

}
