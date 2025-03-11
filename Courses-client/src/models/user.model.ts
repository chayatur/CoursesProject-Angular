import { Course } from "./course.model";

export interface User {
    id?: number; 
    name: string; 
    address?: string;
    email: string;
    password:string;
    role?: Role; 
    course:Course[]
}

export enum Role {
    Student = 0,
    Teacher = 1,
    Admin = 2
}