import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
     const route = inject(Router);
     if(localStorage.getItem('currentUser')){
         return true;
     }else{
         route.navigate(['/login'])
         return false;
     }
};