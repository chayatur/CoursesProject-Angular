
import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/user/login/login.component';
import { RegisterComponent } from '../components/user/register/register.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,
        children:[
            // {path:"courses",component:CoursesComponent},
            {path:"login",component:LoginComponent},
           { path:"register",component:RegisterComponent}
            // { path:'addCourse',component:AddCourseComponent,canActivate:[teacherGuard]},
            // { path:':id',component:ShowCourseComponent,},
            // {path:'addLesson/:id',component:AddLessonComponent}
               
            
        ]
    }
];

