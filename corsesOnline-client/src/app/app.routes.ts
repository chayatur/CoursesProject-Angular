
import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/user/login/login.component';
import { RegisterComponent } from '../components/user/register/register.component';
import { CoursesComponent } from '../components/course/courses/courses.component';
import { teacherGuard } from '../guards/teacher.guard';
import { AddCourseComponent } from '../components/course/add-course/add-course.component';
export const routes: Routes = [
    {path:'',component:HomeComponent,
        children:[
            // {path:"courses",component:CoursesComponent},
            {path:"login",component:LoginComponent},
            { path:"register",component:RegisterComponent},
            { path:"courses",component:CoursesComponent},
            { path:'add-course',component:AddCourseComponent,canActivate:[teacherGuard]},
             { path:':id',component:CoursesComponent,},
            // {path:'addLesson/:id',component:AddLessonComponent}
               
            
        ]
    }
];

