import {Component, Signal, Input} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";
import {VacationControllerService} from '../../../services/vacation-planner/vacation-controller.service';
import Vacation from '../../../models/vacation-planner/vacation.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {WebVacationUtilityService} from '../../../services/utility/web-vacation-utility.service';

@Component({
  selector: 'app-trip-dashboard',
  imports: [MatTabsModule, MatTableModule, FormsModule, MatToolbarModule, MatIcon, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './trip-dashboard.component.html',
  styleUrl: './trip-dashboard.component.scss'
})
export class TripDashboardComponent {
	
	@Input() selectedVacation?: Vacation | null = null;
	  
	  /*vacations: Signal<Vacation[] | [] | null> = toSignal(this.vacationService.getVacationsByUserId().pipe(
		map(response => response.body),
		
		), {initialValue: []}

	  );
	  
	  loading:Signal<boolean> = toSignal(this.vacationService.loadingStatus(), {initialValue:true});*/

	  //constructor(private vacationService: VacationControllerService) {
		//this.vacationService.getVacationsByUserId();
	  //}
	  
	  constructor(private util: WebVacationUtilityService){
		
	  }
	  getValue(str: string, isConfigItemSearch: boolean){
		return this.util.getVacationValue(this.selectedVacation as Vacation, str, isConfigItemSearch);
	  }
}
