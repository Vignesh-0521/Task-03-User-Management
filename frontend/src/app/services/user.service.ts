import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {    //getting users
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => console.log('Fetched users:', users)),   //tap performs side effects like updating UI, logging but does not alter values
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<User> {    //creating new users
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(newUser => console.log('Created user:', newUser)),
      catchError(this.handleError)
    );
  }

  updateUser(id: string, user: User): Observable<User> {    //updating users
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      tap(updatedUser => console.log('Updated user:', updatedUser)),
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {    //deleting users
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Deleted user with id:', id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message; // Client-side error
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;    // Server-side error
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));   //throwing error
  }
}