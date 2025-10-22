import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebVacationUtilityService {

  constructor() { }
  
  getUserID(): string | null{
	return localStorage.getItem("userID");
  }
}
