import { Injectable, signal } from '@angular/core';
import { WebApiService } from '../../services/web-api/web-api.service';
import {Observable} from "rxjs";
import {HttpResponse, HttpErrorResponse} from "@angular/common/http";
import Vacation from '../../models/vacation-planner/vacation.model';
//import VacationUpdater from '../../models/vacation-planner/vacation_updater.model';
import {toObservable} from "@angular/core/rxjs-interop";
import {tap} from "rxjs/operators";
import {WebVacationUtilityService} from '../../services/utility/web-vacation-utility.service';
import PrepaymentSource from '../../models/vacation-planner/prepayment_source.model';
import Prepayment from '../../models/vacation-planner/prepayment.model';
import ConfigItem from '../../models/vacation-planner/vacation_config_item.model';
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
  getVacationListByUserID(): Observable<HttpResponse<Map<number, string> | null | undefined>>{
	this.loading.set(true);
	return this.http.get("/api/v1/vacation/list/" + this.util.getUserID()).pipe(
		tap(() => this.loading.set(false))
	);
  }
  getVacationByID(vacation_id:number): Observable<HttpResponse<Vacation>>{
	return this.http.get("/api/v1/vacation/getVacation/" + vacation_id);
  }
  deleteBudgetItem(budgetItemId:number):Observable<HttpResponse<Vacation>>{
	return this.http.delete("/api/v1/vacation/deleteBudgetItem/" + budgetItemId);
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
	
	/*cancelTripPlanner(id: number):Observable<HttpResponse<Vacation>>{
		return this.http.put("/api/v1/vacation/cancel/" + id, null);
	}*/
	
	/* PREPAYMENT API REQUESTS */
	getAllPrepaymentSources(): Observable<HttpResponse<PrepaymentSource[]>>{
		return this.http.get("/api/v1/prepayment/getPrepaymentSources");
	}
	createNewPrepayment(newPrepayment: any):Observable<HttpResponse<Prepayment | null | undefined>>{
		return this.http.post("/api/v1/prepayment", newPrepayment as Prepayment);
	}
	
	/*CONFIG API REQUESTS*/
	saveConfigItem(configItem:ConfigItem){
		return this.http.put("/api/v1/vacationConfigItem/saveVacationConfigItem", configItem);
	}
	
	/* Update FCC */
	/*setFCC(fcc:any, vacation_id: number):Observable<HttpResponse<Vacation>>{		
		return this.http.put("/api/v1/vacation/setFCC/" + vacation_id, JSON.stringify(fcc));
		
		//return this.http.post("/api/v1/vacation/newFCC", JSON.stringify(alteredFCC), fcc.vacation_id);
	}*/
}
