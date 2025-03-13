import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '../../home/home.component';
import { CourseService } from '../../../services/course.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent,RouterModule, RegisterComponent, HomeComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  avatarLetter: string = '';
  isLogin: boolean = false;

  constructor(private userService: UserService, private courseService: CourseService) {}

  ngOnInit(): void {
    // this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: any) => {
        console.log(users);
      },
      (error: any) => {
        console.error('Error getting users: ', error);
      }
    );
  }

  updateUser(userId: string, user: User) {
    this.userService.updateUser(userId, user).subscribe((res: any) => {
      console.log("User update success", res);
    }, (error: any) => {
      console.log("Error in update", error);
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      //() => this.users = this.users.filter(user => user.ID !== userId)
    )
  }

  onUserAdded(user: User) {
    this.userService.createUser(user).subscribe((res: any) => {
      this.avatarLetter = this.userService.currentUser?.name[0] || ''; // שימוש ב-optional chaining
      this.isLogin = true;
    }, (error: any) => {
      console.log("Sign in didn't succeed", error);
    });
  }

  onUserLogIn(emailPassword: any) {
    this.userService.loginUser(emailPassword).subscribe(
        (res: any) => {
            console.log(this.userService.currentUser);
            this.isLogin = true;

            this.userService.getUserById().subscribe(
                (user: User) => {
                    this.avatarLetter = user?.name[0] || ''; // שימוש ב-optional chaining
                    const userId = user.id; // קבלת ה-ID של המשתמש

                    if (userId) {
                        this.courseService.getCoursesForUser(userId).subscribe(
                            (res: any) => {
                                this.userService.currentUser.courses = res;
                            },
                            (error) => {
                                console.error('Error getting courses for user: ', error);
                            }
                        );
                    } else {
                        console.error('User ID is undefined');
                    }
                },
                (error) => {
                    console.error('Error getting user by ID: ', error);
                }
            );
        },
        (error: any) => {
            console.log("Log in didn't succeed", error);
        }
    );
}
}