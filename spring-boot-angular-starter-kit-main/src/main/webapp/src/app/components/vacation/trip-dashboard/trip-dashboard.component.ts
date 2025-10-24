import {Component, Input} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import Vacation from '../../../models/vacation-planner/vacation.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {WebVacationUtilityService} from '../../../services/utility/web-vacation-utility.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trip-dashboard',
  imports: [MatTabsModule, MatTableModule, FormsModule, MatToolbarModule, MatButtonModule, CommonModule, MatIconModule],
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
	  
	  
	  // Contains the functions and necessary attributes for the Funding, Comps, & Credits section
	  toggleEditModeForFCC(item: any){
		  if(item){
		  	item.value.isEditing = (!item.value.isEditing);
		  }
	  }
	  saveFCCObject(item:any){
		console.log(item);
	  }
	  
	  // The FCC section is powered via JSON. This allows the user to remove a line item from the FCC section
	  deleteElementFromFCC(item: any){
			if(item && this.selectedVacation){
				var fcc_objects = this.selectedVacation.funding_comps_credits;
				
				for(var key in fcc_objects){
					if(item.key == key){
						delete fcc_objects[key as keyof typeof fcc_objects];
					}
				}
				
				this.selectedVacation.funding_comps_credits = fcc_objects;
			}
	  	}
	  
	  constructor(private util: WebVacationUtilityService){
		
	  }
	  getValue(str: string, isConfigItemSearch: boolean){
		return this.util.getVacationValue(this.selectedVacation as Vacation, str, isConfigItemSearch);
	  }
	  
	  
	  
}
