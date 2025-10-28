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
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {VacationControllerService} from "../../../services/vacation-planner/vacation-controller.service";
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-trip-dashboard',
  imports: [MatTabsModule, MatTableModule, FormsModule, MatToolbarModule, MatButtonModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './trip-dashboard.component.html',
  styleUrl: './trip-dashboard.component.scss'
})
export class TripDashboardComponent {
	
	//[key: string]: any;
	
	@Input() selectedVacation?: Vacation | null = null;
	
	/* Used to allow a delay on certain areas of the vacation updater */
	textAreaContent: string = '';
	typingTimer: any;
	doneTypingInterval: number = 5000;

	  
	  
	  // Contains the functions and necessary attributes for the Funding, Comps, & Credits section
	  toggleEditModeForFCC(item: any){
		  if(item){
		  	item.value.isEditing = (!item.value.isEditing);
		  }
	  }
	  saveFCCObject(item:any){
		//this.util.processSingleVacation(this.selectedVacation);
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
			
			//this.selectedVacation = this.util.processSingleVacation(this.selectedVacation);console.log(this.selectedVacation);
			
	  	}
	  
	  constructor(private util: WebVacationUtilityService, private vacationService: VacationControllerService, private snackbar: SnackBarService){
		
	  }
	  getValue(str: string, isConfigItemSearch: boolean){
		return this.util.getVacationValue(this.selectedVacation as Vacation, str, isConfigItemSearch);
	  }
	  
	  _readyToSaveVacation(vacation:Vacation, messageOnError: string) {
		if(vacation){
			vacation.funding_comps_credits = JSON.stringify(vacation.funding_comps_credits);
			
			
			this.vacationService.updateVacation(vacation).subscribe({
				next:(resp) => {
					if(resp && resp.body){
						this.selectedVacation = this.util.processSingleVacation(resp.body);
					}
				},
				error: (err: any) => {
					this.snackbar.showMessage(messageOnError, 'error');
				}
			});
		}
	  }
		
	  updateVacation(vacation: Vacation, delay: boolean, messageOnError: string){
		
		/*if(vacation){
			this.vacationService.vacationUpdater.vacation = vacation;
			this.vacationService.vacationUpdater.messages.onError = messageOnError;
		}*/
		
		if(delay){
			clearTimeout(this.typingTimer);
			
			this.typingTimer = setTimeout(() =>{
				this._readyToSaveVacation(vacation, messageOnError);
			}, this.doneTypingInterval);
		}else{
			this._readyToSaveVacation(vacation, messageOnError);
		}
		
	  }
	  
	  
	  
}
