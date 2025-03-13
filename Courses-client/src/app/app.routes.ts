
import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/user/login/login.component';
import { RegisterComponent } from '../components/user/register/register.component';
import { AddCourseComponent } from '../components/course/add-course/add-course.component';
import { teacherGuard } from '../guards/teacher.guard';
import { CoursesComponent } from '../components/course/courses/courses.component';
import { AuthComponent } from '../components/user/auth/auth.component';
import { EditCourseComponent } from '../components/course/edit-course/edit-course.component';
import { LessonsComponent } from '../components/lessons/lessons.component';

export const routes: Routes = [
   
    {path:'',component:AuthComponent},
    {path:"home",component:HomeComponent,
        children:[
            {path:"courses",component:CoursesComponent},
            { path:'add-course',component:AddCourseComponent,canActivate:[teacherGuard]},
            { path:':id',component:CoursesComponent,},
            {path:'add-lesson/:id',component:LessonsComponent}
               
            
        ]
    }

//  { path: 'auth', component: AuthComponent,
//     children: [
//         { path: 'login', component: LoginComponent },
//         { path: 'register', component: RegisterComponent },
//         { path: '', redirectTo: 'login', pathMatch: 'full' } // ברירת מחדל לכניסה
//     ]
// },
// {
//     path: 'home', component: HomeComponent,
//     children: [
//         {
//             path: 'courses',
//             component: CoursesComponent,
//             children: [
//                 { path: 'edit/:title/:description/:id/:teacherId', component: EditCourseComponent },
//                 { path: ':id', component:CoursesComponent  }, // להציג מידע על קורס ספציפי
//             ]
//         },
//         { path: 'add-course', component: AddCourseComponent, canActivate: [teacherGuard] }, 
//         { path: '', redirectTo: 'courses', pathMatch: 'full' } // ברירת מחדל לקורסים
//     ]
// },
// { path: '', redirectTo: '/auth', pathMatch: 'full' }, // ברירת מחדל לנתיב התחברות
];