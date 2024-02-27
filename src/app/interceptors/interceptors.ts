import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './auth.interceptors';
import { ErrorInterceptor } from './error.interceptors';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
