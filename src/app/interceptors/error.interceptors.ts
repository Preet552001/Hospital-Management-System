import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, from, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err)=>{
        console.log(err);
      if(err instanceof HttpErrorResponse){
        if(err.error instanceof ErrorEvent){
          console.log('Error Event')
        }else{
          switch(err.error.code){
            case 401:
              console.log(err.error.code);
              this.toastr.error('Unauthorized User','401',{
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
              });
            break
            case 403:
              console.log(err.error.code);
              this.toastr.error('','403',{
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
              });
              break
              case 400:
                console.log(err.error.code);
                this.toastr.error('','400',{
                  timeOut: 3000,
                  positionClass: 'toast-bottom-right',
                });
                break
            case 404:
              console.log(err.error.code);
              this.toastr.error('','404',{
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
              });
              break
            case 500:
                console.log(err.error.code);
              this.toastr.error('Internal Server Error','500',{
                timeOut: 3000,
                positionClass: 'toast-bottom-right',
              });
              break
            case 503:
                console.log(err.error.code);
                this.toastr.error('Service Unavailable','503',{
                  timeOut: 3000,
                  positionClass: 'toast-bottom-right',
                });
                break
          }
        }
      }
      else{
        console.log('An error occured')
      }
      return throwError(()=>{
        new Error(err.statusText)
      })
    }))
  }
}
