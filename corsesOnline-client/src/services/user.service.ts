import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { env } from 'process';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: User;
    constructor(private http: HttpClient, private router: Router) {}

    private userSubject = new BehaviorSubject<User | null>(null)
    createUser(user: User): Observable<any> {
        return this.http.post<any>(`${env}/user/register`, user).pipe(
            tap((res: any) => {
                this.currentUser = user;
                this.currentUser.id = res.userId;
                this.currentUser.course = [];
            }),
           catchError(this.handleError('createUser'))
        );
    }

    register(name: string, email: string, password: string, role: string): Observable<any> {
        const body = { name, email, password, role };
        return this.http.post(`${env}/register`, body).pipe(
            catchError(this.handleError('register')),
            tap(() => this.router.navigate(['/login'])) // ניתוב לדף הכניסה במקרה של הצלחה
        );
    }

    login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post(`${env}/login`, body).pipe(
            catchError(this.handleError('login')),
            tap((res: any) => {
                sessionStorage.setItem('token', res.token);
                this.router.navigate(['/home']); // ניתוב לדף הבית במקרה של הצלחה
            })
        );
    }

    logout(): void {
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    private handleError(operation: string) {
        return (error: any): Observable<any> => {
            let errorMessage = `Error, ${operation} failed`;
            if (error.status === 400) {
                errorMessage = 'Invalid input. Please check your data.';
            } else if (error.status === 409) {
                errorMessage = 'Email already exists. Please use a different email.';
            } else if (error.status === 401) {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.status === 404) {
                errorMessage = 'User does not exist. Please register.';
            }
            console.error(errorMessage); // לוג של השגיאה
            return of(null); // החזרת Observable ריק
        };
    }
}
