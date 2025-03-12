import { Course } from "./course.model";

export interface User {
    id?: number; 
    name: string; 
    address?: string;
    email: string;
    password:string;
    role?: Role; 
    courses:Course[]
}
export type ResponceSign={
    message:string,
    userId:number,
    token:string
}
export enum Role {
    Student = 0,
    Teacher = 1,
    Admin = 2
}