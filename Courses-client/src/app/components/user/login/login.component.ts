import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone:true,
     imports:[],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]], // אימות דוא"ל
            password: ['', [Validators.required]] // אימות סיסמה
        });
    }

    login() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value; // קבלת הערכים מהטופס
            this.userService.login(email, password).subscribe(
                response => {
                    localStorage.setItem('token', response.token);
                    console.log('Login successful', response);
                    this.showSuccessMessage('ההתחברות הצליחה!'); // הודעת הצלחה
                    this.router.navigate(['/courses']); // נווט למסך הקורסים
                },
                error => {
                    console.error('Login failed', error);
                    this.showErrorMessage('ההתחברות נכשלה. אנא בדוק את הפרטים שלך ונסה שוב.'); // הודעת שגיאה
                }
            );
        } else {
            this.showErrorMessage('אנא מלא את כל השדות הנדרשים.'); // הודעת שגיאה אם הטופס לא תקין
        }
    }

    private showSuccessMessage(message: string) {
        this.snackBar.open(message, 'סגור', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }

    private showErrorMessage(message: string) {
        this.snackBar.open(message, 'סגור', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }
}
