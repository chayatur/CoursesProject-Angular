import { Component, Output } from '@angular/core';
import { Role, User } from '../../../models/user.model';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatCard, MatCardFooter, MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { EventEmitter } from 'stream';
@Component({
  selector: 'app-register',
  imports: [MatCardFooter,MatFormFieldModule,MatSelectModule,MatOptionModule,FormsModule,ReactiveFormsModule,MatLabel,MatSelectModule,MatOptionModule,MatFormField,MatCardModule,MatError],
  standalone:true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isPressSignIn: boolean = false;
  signInForm: FormGroup;
  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>(); // ודא שההגדרה נכונה

  constructor(private formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required]
    });
  }

  changePressSignin() {
    this.isPressSignIn = !this.isPressSignIn;
  }

  OnSubmit() {
    const newUser: User = this.signInForm.value as User;

    if (newUser.role !== Role.Teacher && newUser.role !== Role.Student) {
      alert("role must be Teacher or Student");
      return;
    } else {
      this.userAdded.emit(newUser);
    }
  }

  get valid(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
}