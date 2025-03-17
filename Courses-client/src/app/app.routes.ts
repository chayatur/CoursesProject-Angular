import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { CoursesComponent } from '../components/courses/courses.component';
import path from 'path';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { teacherGuard } from '../guard/teacher.guard';
import { ShowCourseComponent } from '../components/show-course/show-course.component';
import { HomeComponent } from '../components/home/home.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';

export const routes: Routes = [
{path:'',component:AuthComponent},
{path:"home",component:HomeComponent,
    children:[
        {path:"courses",component:CoursesComponent},
        { path:'addCourse',component:AddCourseComponent,canActivate:[teacherGuard]},
        { path:':id',component:ShowCourseComponent,},
        {path:'addLesson/:id',component:AddLessonComponent}
           
        
    ]
}

];
