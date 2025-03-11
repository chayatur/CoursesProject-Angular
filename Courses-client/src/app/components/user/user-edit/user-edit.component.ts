// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-user-edit',

// standalone:true,
// imports:[],
//   templateUrl: './user-edit.component.html',
//   styleUrl: ['./user-edit.component.css']
// })
// export class UserEditComponent implements OnInit {
  
//   export interface User {
//   id?: number;
//   name: string;
//   address?: string;
//   email: string;
//   password: string;
//   role?: Role

// }

// export enum Role {
//   Student = 0,
//   Teacher = 1,
//   Admin = 2
// }

// @Component({
//   selector: 'app-update-student',
//   templateUrl: './update-student.component.html',
//   styleUrls: ['./update-student.component.css']
// })
// export class UpdateStudentComponent implements OnInit {
//   updateForm: FormGroup;
//   userId!: number;
//   token: string;
//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.updateForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       address: [''],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       role: [Role.Student]
//     });

//     this.token = localStorage.getItem('token') || ''; 
//   }

//   ngOnInit(): void {
//     this.userId = +this.route.snapshot.paramMap.get('id')!;
//     this.loadStudentData();
//   }

//   loadStudentData(): void {
//     this.http.get<User>(`http://localhost:3000/api/users/${this.userId}`, {
//       headers: { Authorization: `Bearer ${this.token}` } 
//     }).subscribe(
//       (data) => {
//         this.updateForm.patchValue(data);
//       },
//       (error) => {
//         console.error('Error loading student data', error);
//       }
//     );
//   }

//   onSubmit(): void {
//     if (this.updateForm.valid) {
//       this.http.put(`http://localhost:3000/api/users/${this.userId}`, this.updateForm.value, {
//         headers: { Authorization: `Bearer ${this.token}` } // הוספת ה-TOKEN לכותרת
//       }).subscribe(
//         () => {
//           console.log('Student updated successfully');
//           this.router.navigate(['/students']); // ניווט חזרה לרשימת התלמידים
//         },
//         (error) => {
//           console.error('Error updating student', error);
//         }
//       );
//     }
//   }
// }
  
// }
