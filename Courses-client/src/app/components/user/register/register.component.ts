import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { User, Role } from  'src/models/user.model'
import { UserService } from 'src/services/user.service';
@Component({

  selector: 'app-register',
standalone:true,
imports:[],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
      loginForm: FormGroup | undefined;
      avatarLetter!: string;
      isLogin!: boolean;

    constructor(private userService: UserService,private formBuilder: FormBuilder) {
         this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]], // אימות דוא"ל
        password: ['', [Validators.required]] // אימות סיסמה
    });
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
