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
import {VacationProcessorService} from '../../../services/vacation-processor/vacation-processor.service';
import {VacationUpdaterService} from '../../../services/vacation-updater/vacation-updater.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-trip-dashboard',
  imports: [MatTabsModule, MatTableModule, FormsModule, MatToolbarModule, MatButtonModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './trip-dashboard.component.html',
  styleUrl: './trip-dashboard.component.scss'
})
export class TripDashboardComponent {
	
	//@Input() selectedVacation?: Vacation | null = null;
	selectedVacation?: Vacation | null = null;
	
	private dataSubscription: Subscription | undefined;
	
	/* Used to allow a delay on certain areas of the vacation updater */
	textAreaContent: string = '';
	typingTimer: any;
	doneTypingInterval: number = 5000;
	
	
	constructor(private util: WebVacationUtilityService,
				private vacationService: VacationControllerService,
				private snackbar: SnackBarService,
				private processor: VacationProcessorService,
				private vacationUpdater: VacationUpdaterService){}
				
				
	ngOnInit(){
		this.dataSubscription = this.vacationUpdater.sharedData$.subscribe(data=>{
			console.log("new thing happening");console.log(data);
			this.selectedVacation = data;
		});
	}
	ngOnDestroy(){
		this.dataSubscription?.unsubscribe();
	}

	  
	  
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
	  
	  
	  getValue(str: string, isConfigItemSearch: boolean, onErrorReturnMessage: string){
		return this.util.getVacationValue(this.selectedVacation as Vacation, str, isConfigItemSearch, onErrorReturnMessage);
	  }
	  
	  async _readyToSaveVacation(vacation:Vacation, messageOnError: string) {
		if(vacation){
			vacation.funding_comps_credits = JSON.stringify(vacation.funding_comps_credits);
			
			
			this.vacationService.updateVacation(vacation).subscribe({
				next:(resp) => {
					if(resp && resp.body){
						this.processor.processSingleVacation(resp.body).then(stuff => {
							this.selectedVacation = stuff;
						});
					}
				},
				error: (err: any) => {
					this.snackbar.showMessage(messageOnError, 'error');
				}
			});
		}
	  }
		
	  updateVacation(vacation: Vacation, delay: boolean, messageOnError: string){
		
		if(delay){
			clearTimeout(this.typingTimer);
			
			this.typingTimer = setTimeout(() =>{
				this._readyToSaveVacation(vacation, messageOnError);
			}, this.doneTypingInterval);
		}else{
			this._readyToSaveVacation(vacation, messageOnError);
		}
		
	  }
	  
	  calculateCreditCardFunding(){
		var creditCardFunding:number = 0;
		if(this.selectedVacation){
			const useAutomaticCreditCardFunding = this.util.getVacationValue(this.selectedVacation, "use_automatic_credit_card_funding", true, "");
			
			if(useAutomaticCreditCardFunding.toString().toLowerCase() == "true"){
				const estimatedTripPackagePrice:number = this.selectedVacation.meta.estimated_trip_package_price || 0;
				const totalPrepayments:number = this.selectedVacation.meta.totalPrepayments || 0;
				const mainFunding:number = this.selectedVacation.meta.fo_main_funding || 0;
				
				creditCardFunding = ( estimatedTripPackagePrice - totalPrepayments - mainFunding );
				
				if(creditCardFunding < 0){
					creditCardFunding = 0;
				}
			}
		}
		
		return creditCardFunding;
	  }
	  
	  getCreditCardFunding(){
		return this.calculateCreditCardFunding().toFixed(2);
	  }
	  
	  getTotalFunding(){
		var totalFunding = 0;
		
		if(this.selectedVacation){
			totalFunding = this.calculateCreditCardFunding() + ( this.selectedVacation.meta.totalPrepayments || 0 ) + ( this.selectedVacation.meta.fo_main_funding || 0 );
		}
		
		return totalFunding.toFixed(2);
	  }
	  
	  generateModal(modalTarget:string, fcc:any){
		var data = {
			vacation_id: this.selectedVacation?.id,
			vacation: this.selectedVacation,
			fcc:fcc
		}
		
		console.log("trip dashboard genmod data");
		console.log(data);
	  	if(modalTarget){
	  		this.util.generateModal(modalTarget, data);
	  	}
	  }
}
