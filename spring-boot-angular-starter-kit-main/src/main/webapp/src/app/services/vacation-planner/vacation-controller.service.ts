import { Injectable, signal } from '@angular/core';
import { WebApiService } from '../../services/web-api/web-api.service';
import {Observable} from "rxjs";
import {HttpResponse, HttpErrorResponse} from "@angular/common/http";
import Vacation from '../../models/vacation-planner/vacation.model';
//import VacationUpdater from '../../models/vacation-planner/vacation_updater.model';
import {toObservable} from "@angular/core/rxjs-interop";
import {tap} from "rxjs/operators";
import {WebVacationUtilityService} from '../../services/utility/web-vacation-utility.service';

@Injectable({
  providedIn: 'root'
})
export class VacationControllerService {
	private loading = signal(false);
	//public vacationUpdater: VacationUpdater = new VacationUpdater();

  constructor(private http: WebApiService, private util: WebVacationUtilityService) {}
  
  saveVacation(vacation: Vacation): Observable<HttpResponse<Vacation> | null | undefined>{
	return this.http.post('/api/v1/vacation', vacation);
  }
  updateVacation(vacation: Vacation):Observable<HttpResponse<Vacation> | null | undefined>{
	return this.http.put('/api/v1/vacation', vacation);
  }
  getVacationsByUserId(): Observable<HttpResponse<Vacation[]>>{
	this.loading.set(true);
	
	return this.http.get("/api/v1/vacation/" + this.util.getUserID()).pipe(
		tap(() => this.loading.set(false))
	);
			/*.subscribe({
				next: (result: Vacation | null | undefined) => {
					console.log(result);
					this.loading.set(false);
				},
				error: (error: HttpErrorResponse) => {
					
				}
			});*/
  	}
	
	loadingStatus(): Observable<boolean> {
		return toObservable(this.loading);
	}
	
}
