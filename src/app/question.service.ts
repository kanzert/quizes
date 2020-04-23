import {Question} from './entities/question';
import {MessageService} from './message.service';

import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl = 'api/questions';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl)
      .pipe(
        tap(_ => this.log('fetched questions')),
        catchError(this.handleError<Question[]>('getQuestions', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/${id}`;
    return this.http.get<Question>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Question>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`QuestionService: ${message}`);
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
  // getQuestions(): Question[] {
  //   return QUESTIONS;
  // }
  updateQuestion(question: Question): Observable<any>  {
    return this.http.put(this.questionsUrl, question, this.httpOptions).pipe(
      tap(_ => this.log(`updated question id=${question.id}`)),
      catchError(this.handleError<any>('updateQuestion'))
    );
  }

  /** POST: add a new hero to the server */
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, this.httpOptions).pipe(
      tap((newQuestion: Question) => this.log(`added question w/ id=${newQuestion.id}`)),
    catchError(this.handleError<Question>('addQuestion'))
    );
  }

  deleteQuestion(question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    const url = `${this.questionsUrl}/${id}`;

    return this.http.delete<Question>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted question id=${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }
}
