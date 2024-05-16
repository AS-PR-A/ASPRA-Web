import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
     const route = inject(Router);
     if(sessionStorage.getItem('currentUser')){
         return true;
     }else{
        alert("Debe iniciar sesion para ingresar a esta pagina")
         route.navigate(['/login'])
         return false;
     }
};