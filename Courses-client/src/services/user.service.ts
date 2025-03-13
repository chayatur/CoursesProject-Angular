import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponceSign,Role,User } from '../models/user.model';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api';
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({ id: -1, name: '', email: '', password: '', role: Role.Student, courses: [] });
    token!: string;
  
    constructor(private http: HttpClient) { }
  
    get currentUser(): User {
      return this.currentUserSubject.value;
    }
  
    get currentUserObservable(): Observable<User> {
      return this.currentUserSubject.asObservable();
    }
  
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
  
    createUser(user: User): Observable<ResponceSign> {
      return this.http.post<ResponceSign>(`${this.apiUrl}/auth/register`, user).pipe(
        tap((res: ResponceSign) => {
          user.id = res.userId;
          this.token = res.token;
          user.courses = [];
          this.currentUserSubject.next(user); 
        })
      );
    }
  
    loginUser(emailPassword: any): Observable<User> {
      return this.http.post<User>(`${this.apiUrl}/auth/login`, emailPassword).pipe(
        tap((res: any) => {
          const user: User = {
            id: res.userId,
            name: res.name,
            email: res.email,
            password: '', // אל תשמור סיסמאות
            role: res.role,
            courses: []
          };
          sessionStorage.setItem('token', res.token);
          this.currentUserSubject.next(user); 
        })
      );
    }
  
    updateUser(userId: string, user: User): Observable<User> {
      return this.http.put<User>(`${this.apiUrl}/users/${userId}`, user);
    }
  
    deleteUser(userId: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
    }
  
    getUserById(): Observable<User> {
      const currentUser = this.currentUserSubject.value;
      if (currentUser && currentUser.id !== -1) {
        return of(currentUser); // מחזיר את המשתמש הנוכחי כ-Observable
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      return this.http.get<User>(`${this.apiUrl}/users/${currentUser.id}`, { headers }).pipe(
        tap((res: User) => {
          this.currentUserSubject.next(res); // מעדכן את המשתמש הנוכחי
        })
      );
    }
  
    getUserFromToken() {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          this.getUserById().subscribe(); // טוען את המשתמש מה-API
        } catch (error) {
          console.error('שגיאה בפענוח ה-Token:', error);
        }
      }
    }
}
