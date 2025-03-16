import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const teacherGuard: CanActivateFn = (route, state) => {
 const userservice=inject(UserService)
  return sessionStorage.getItem('role')=='teacher'
};
