import { Lesson } from "./lesson.model";

export class Course {
    id: number | undefined;
    title!: string;
    description!: string;
    teacherId!: number;
    lessons:Lesson[] | undefined
  }
  