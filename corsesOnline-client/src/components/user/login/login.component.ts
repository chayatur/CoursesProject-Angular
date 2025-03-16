import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { response } from 'express';
import{MatSnackBar} from '@angular/material/snack-bar'
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EventEmitter } from 'stream';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    isPressLogIn: Boolean = false
    logInForm!: FormGroup;
    @Output() loginUser = new EventEmitter<{email:string,password:string}>();
    constructor(private formBuilder: FormBuilder) {
      this.logInForm = this.formBuilder.group(
        {
          email: ['', Validators.email],
          password: ['', [Validators.required, Validators.minLength(3)]],
        }
      )
    }
    changePressLogin() {
      this.isPressLogIn = !this.isPressLogIn
    }
    OnSubmit() {
     // if (this.signInForm.invalid) {
      const emailPassword=this.logInForm.value;
      this.loginUser.emit(emailPassword);
    }
  
    get valid(): { [key: string]: AbortController } {
      return this.logInForm.controls
    }
 }
 