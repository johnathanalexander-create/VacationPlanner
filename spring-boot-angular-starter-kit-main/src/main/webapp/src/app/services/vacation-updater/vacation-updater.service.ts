import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VacationProcessorService} from '../../services/vacation-processor/vacation-processor.service';

@Injectable({
  providedIn: 'root'
})
export class VacationUpdaterService {
	
	private selectedVacation = new BehaviorSubject<any>(null);
	public sharedData$: Observable<any> = this.selectedVacation.asObservable();

  	constructor(private processor: VacationProcessorService) { }
	
	updateVacation(newData: any){console.log("updating");
		this.processor.processSingleVacation(newData).then(processedVacation=>{
			this.selectedVacation.next(processedVacation);
		});
		
		//this.selectedVacation.next(newData);
	}
}
