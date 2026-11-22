import { inject, Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  canLoad(_route: Route, _segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkAuthentication();
  }

  private checkAuthentication(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated.pipe(
      filter((value): value is boolean => value !== null),
      take(1),
      map((isAuthenticated) =>
        isAuthenticated ? true : this.router.createUrlTree(['/login']),
      ),
    );
  }
}
