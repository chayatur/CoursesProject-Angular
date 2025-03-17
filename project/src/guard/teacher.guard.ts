import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const userservice=inject(UserService)
  return sessionStorage.getItem('role')=='teacher'
};
