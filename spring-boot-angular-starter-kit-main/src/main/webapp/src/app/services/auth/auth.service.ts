import {Injectable} from '@angular/core';
import User from '../../models/security/user.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {WebApiService} from '../web-api/web-api.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

import Permission from '../../models/security/permission.model'

export interface Credentials {
  email: string;
  password: string;
}
export interface Registration {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: WebApiService, private jwtHelper: JwtHelperService, private router: Router) {
  }
  
  isAdminUser:boolean = false;

  login(credentials: Credentials): Observable<User | null | undefined> {
    return this.http.post('/api/v1/auth/authenticate', credentials).pipe(
      tap((result: any) => {
		console.log(result);
        localStorage.setItem('accessToken', result.body.access_token);
        localStorage.setItem('refreshToken', result.body.refresh_token);
		localStorage.setItem('userID', result.body.userId);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUsername(): string | null {
    const token = localStorage.getItem('accessToken');

    if (token) {
      return this.jwtHelper.decodeToken(token).sub;
    }

    return null;
  }
  getUserID(): string | null {
	return localStorage.getItem("userId");
  }
  
  
  async isAdmin(): Promise<boolean>{
	
	
	var roles:Array<Permission> = [];
	
	await this.http.get('/api/v1/profile/me').toPromise().then(response => {
		roles = response.body.roles;
	})
	
	if(roles.length > 0){
		roles.forEach((role: Permission) =>{
			if(role.name == "ROLE_ADMIN"){
				this.isAdminUser = true;
				return;
			}
		});
	}
	
	return this.isAdminUser;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth/login'])
  }
  
  register(registration: Registration): Observable<User | null | undefined> {
	return this.http.post('/api/v1/auth/register', registration).pipe(
		tap((result: any) => {
			localStorage.setItem('accessToken', result.body.access_token);
			localStorage.setItem('refreshToken', result.body.refresh_token);
		})
	)
  }
}
