import { ChangeDetectionStrategy, Component, Output, output } from '@angular/core';
import { Role,User } from '../../../models/user.model';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatCard, MatCardFooter } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';
import { CourseService } from '../../../services/course.service';
@Component({
    selector: 'app-register',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
    Role = Role; // הוסף את השורה הזו
    isPressSignIn: boolean = false;
    isDisabled: boolean = false;
    signInForm!: FormGroup;
    @Output() userAdded = new EventEmitter<User>();

    constructor(private formBuilder: FormBuilder, private userService: UserService, private courseService: CourseService) {
        this.signInForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            role: ['', Validators.required]
        });
    }

    OnSubmit() {
        if (this.signInForm.invalid) {
            alert("Please fill in all required fields correctly.");
            return;
        }

        let newUser: User = this.signInForm.value;

        if (newUser.role === undefined || ![Role.Teacher, Role.Student, Role.Admin].includes(newUser.role)) {
            alert("role must be teacher, student, or admin");
            return;
        }

        this.userAdded.emit(newUser);
        this.getCoursesForCurrentUser();
    }
    changePressSignin() {
        this.isPressSignIn = !this.isPressSignIn
      }
    getCoursesForCurrentUser() {
        const userId = this.userService.currentUser?.id;

        if (userId !== undefined) {
            this.courseService.getCoursesForUser(userId).subscribe(
                (courses: any) => {
                    // עיבוד הקורסים שהתקבלו
                },
                (error: any) => {
                    console.error('Error fetching courses:', error);
                }
            );
        } else {
            console.error('User ID is undefined');
        }
    }

    get valid(): { [key: string]: AbstractControl } {
        return this.signInForm.controls;
    }
}