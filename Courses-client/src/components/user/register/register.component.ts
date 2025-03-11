import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatCard, MatCardFooter } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-register',
  imports: [MatCardFooter,MatFormField,MatLabel,MatSelect,MatOption,MatFormField,MatCard,MatError],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerForm: FormGroup ;
  avatarLetter!: string;
  isLogin!: boolean;
  
  constructor(private fb: FormBuilder, private http: HttpClient,  private userService:UserService ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  register() {
    if (this.registerForm.valid) {
        const userData = this.registerForm.value; 
        this.http.post('http://localhost:3000/api/auth/register', userData)
            .subscribe(response => {
                console.log('Registration successful:', response);
            }, error => {
                console.error('Registration failed:', error);
            });
    } else {
        console.log('Form is not valid');
    }
}

onUserAdded(user: User) { 
this.userService.createUser(user).subscribe((res: any) => {
  console.log("signIn succes", res);
  console.log(res.userId)
  this.avatarLetter = this.userService.currentUser.name[0]
  console.log(this.userService.currentUser.id)
  this.isLogin = true
}, (error: any) => {
  console.log("sign in didnt succes", error);
}
)
}

}
