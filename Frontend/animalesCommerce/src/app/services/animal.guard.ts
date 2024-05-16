import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AnimalGuard: CanActivateFn = () => {
     const route = inject(Router);
     if(sessionStorage.getItem('currentUser') == "\"admin\""){
         return true;
     }else{
        alert("No posee permisos de administrador!")
         route.navigate(['/'])
         return false;
     }
};