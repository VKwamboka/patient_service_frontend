import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; 
  }

 
  const path = state.url;
  const fallbackRole = path.includes('doctor') ? 'doctor' : 'patient';

  router.navigate([`/login/${fallbackRole}`]);
  return false;
};
