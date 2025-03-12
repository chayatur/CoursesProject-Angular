import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponceSign,Role,User } from '../models/user.model';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({ id: -1, name: '', email: '', password: '', role: Role.Student, courses: [] });
  token!: string;

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  get currentUser(): User {
    return this.currentUserSubject.value;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: User): Observable<ResponceSign> {
    const res = this.http.post<ResponceSign>(`${this.apiUrl}/auth/register`, user).pipe(
      tap((res: ResponceSign) => {
        user.id = res.userId;
        this.token = res.token;
        user.courses = [];
        this.currentUserSubject.next(user); 
      })
    );
    return res;
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
    // בדוק אם המשתמש הנוכחי כבר קיים
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
        // אם כן, מחזיר Observable עם המשתמש הנוכחי
        return of(currentUser); // מחזיר את המשתמש הנוכחי כ-Observable
    }

    // אם לא, מבצע קריאה לשרת
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<User>(`${this.apiUrl}/users/${this.currentUser.id}`, { headers }).pipe(
        tap((res: User) => {
            this.currentUserSubject.next(res); // מעדכן את המשתמש הנוכחי
        })
    );
}
}