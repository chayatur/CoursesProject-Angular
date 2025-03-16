import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollService{

constructor(private http: HttpClient) { }
  
    private baseUrl = 'http://localhost:3000/api/courses/';
    public coursesToStudent: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

    getCourseByStudent(id:Number){
      this.http.get<Course[]>(this.baseUrl+"student/"+id).subscribe(data=>
           {  
            this.coursesToStudent.next(data)
             console.log(data)
           },
           error => alert("failed")
      );
    }
      addRoll(courseId: Number,id:Number){
        console.log(this.coursesToStudent.value)
        this.http.post<any>(this.baseUrl+courseId+"/enroll",{userId:id}).subscribe(data=>
          {this.getCourseByStudent(id)
          alert("You add to the course")},
          error => alert("failed")
        )
      }
      deleteRoll(courseId: Number,id:Number){
        this.http.delete<any>(this.baseUrl+courseId+"/unenroll",{body:{userId:id}}).subscribe(data=>
         { this.getCourseByStudent(id)
          alert("You get outside to the course")},
          error => alert("failed")
        )
      }
  
}
