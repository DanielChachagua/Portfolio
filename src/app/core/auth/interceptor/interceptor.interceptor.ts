import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  if (tokenService.existToken()) {
    const token = tokenService.getToken();
    const headers = new HttpHeaders().append('Authorization', `${token}`);

    req = req.clone({ headers: headers});
  }

  return next(req);
};
