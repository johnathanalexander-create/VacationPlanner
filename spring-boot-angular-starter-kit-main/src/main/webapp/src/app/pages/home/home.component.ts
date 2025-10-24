import {Component, Signal, Input, effect} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";
import {VacationControllerService} from '../../services/vacation-planner/vacation-controller.service';
import Vacation from '../../models/vacation-planner/vacation.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { TripDashboardComponent } from '../../components/vacation/trip-dashboard/trip-dashboard.component';
import { PrepaymentsComponent } from '../../components/vacation/prepayments/prepayments.component';



@Component({
    selector: 'app-home',
    imports: [MatToolbarModule, MatSelectModule, MatTableModule, MatButtonModule, MatTabsModule, 
			 CommonModule, FormsModule, TripDashboardComponent, PrepaymentsComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  selectedVacation?: Vacation | null = null;
  
  processAllVacations(body: any){
	//Process all vacations returned from the signal
	
	//For each vacation object
	for(var index = 0; index < body.length; index++){
		const vacation = body[index];
		if(vacation){
			//Retrieve the funding,comps, and credits string
			var fcc = vacation.funding_comps_credits;
			
			if(fcc){
				//and convert it into a JSON object for display in the table
				vacation.funding_comps_credits = JSON.parse(fcc);
			}
		}
	}
	return body;
  }
  
  vacations: Signal<Vacation[] | [] | null> = toSignal(this.vacationService.getVacationsByUserId().pipe(
	map(response => this.processAllVacations(response.body))
		
	), {initialValue: []}

  );
  
  	
  
  loading:Signal<boolean> = toSignal(this.vacationService.loadingStatus(), {initialValue:true});

  constructor(private vacationService: VacationControllerService) {
	this.vacationService.getVacationsByUserId();
  }
}
