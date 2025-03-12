import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Lesson } from '../models/lesson.model';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl = 'http://localhost:3000/api/courses/';
  public lessons: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);

  constructor(private http: HttpClient) { }

  getLessons(cId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.baseUrl + cId + "/lessons").pipe(
      tap(data => this.lessons.next(data)), // שמירה על השיעורים ב-BahaviorSubject
      catchError(error => {
        console.error("Failed to fetch lessons:", error);
        alert("Failed to fetch lessons"); // טיפול בשגיאות
        return throwError(error); // החזר שגיאה
      })
    );
  }

  addLesson(les: Lesson): Observable<any> {
    return this.http.post<any>(this.baseUrl + les.courseId + "/lessons", les).pipe(
      tap(() => this.getLessons(les.courseId).subscribe()) // רענון השיעורים לאחר הוספה
    );
  }

  updateLesson(id: number, les: Lesson): Observable<any> {
    return this.http.put<any>(this.baseUrl + les.courseId + "/lessons/" + id, les).pipe(
      tap(() => this.getLessons(les.courseId).subscribe()) // רענון השיעורים לאחר עדכון
    );
  }

  deleteLesson(cId: number, id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + cId + "/lessons/" + id).pipe(
      tap(() => this.getLessons(cId).subscribe()) // רענון השיעורים לאחר מחיקה
    );
  }
}