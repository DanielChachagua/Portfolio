import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { isPlatformBrowser } from '@angular/common';

export const loginGuard: CanMatchFn = (route, segments) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID); 
  // Verifica si el código se está ejecutando en el navegador 
  if (!isPlatformBrowser(platformId)) { 
    return true; // Permite el acceso si está en el servidor
  }

  const isLoggedIn = userService.isLogin();

  if (isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
