import { Inject, Component } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MultiSelectComponent} from "../../../../components/shared/multi-select/multi-select.component";
import {FormValidationService} from "../../../../services/form-validation/form-validation.service";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {VacationControllerService} from '../../../../services/vacation-planner/vacation-controller.service';
import { CommonModule } from '@angular/common';
import {VacationUpdaterService} from '../../../../services/vacation-updater/vacation-updater.service';

import Vacation from '../../../../models/vacation-planner/vacation.model';
import FCC from '../../../../models/vacation-planner/fcc.model';






@Component({
  selector: 'app-fcc-modal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MultiSelectComponent, CommonModule],
  templateUrl: './fcc-modal.component.html',
  styleUrl: './fcc-modal.component.scss'
})
export class FCCModalComponent {
	fccItemGroup = this.formBuilder.group({
		vacation_id: [this.modalInputData.vacation_id, []],
		id: [this.modalInputData.data.fcc.id || "", []],
		fccTitle: [this.modalInputData.data.fcc.fccTitle || "", [Validators.required]],
		fccAmount: [this.modalInputData.data.fcc.fccAmount || "", []]		
	});
	
	constructor(private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService,
				public dialogRef: MatDialogRef<FCCModalComponent>
	){}
	
	submitFCC(){
		
		/*const vacation = this.modalInputData.data.vacation;
		
		//var fccFromModal = this.fccItemGroup.fccAmount;
		var fccFromModal = this.fccItemGroup.get("fccAmount")?.value;
		var createNewFCC = this.modalInputData.data.createNewFCC;
		
		var fcc = vacation.funding_comps_credits;
		
		console.log("fcc");
		console.log(fcc);*/
		
		/*if(createNewFCC){
			//Need to add a new object to fcc
			fcc[fccFromModal.fccTitle] = {
				value:fccFromModal.fccAmount,
				isEditing: false
			}
		}else{
			//Need to update an existing fcc object
			
			for(var fccKey in fcc){
				if(fccKey == fccFromModal.fccTitle){
					fcc[fccKey] = {
						value: fccFromModal.fccAmount,
						idEditing: false
					}
				}
			}
		}*/
		
		//vacation.funding_comps_credits = JSON.stringify(fcc);//shouldn't need to stringify anymore. got a table for it
		const fccObject: FCC = {
            id: 0,
            fccTitle: this.fccItemGroup.get("fccTitle")?.value,
            fccAmount: this.fccItemGroup.get("fccAmount")?.value
        };
		this.modalInputData.data.vacation.funding_comps_credits.push(fccObject);
		
		console.log("fcc updating attempt");
		console.log(this.modalInputData.data.vacation)
		
		this.vacationService.updateVacation(this.modalInputData.data.vacation as Vacation).subscribe({
			next:(resp:any) => {console.log("fcc updated");
				this.vacationUpdater.updateVacation(resp.body);
				this.dialogRef.close();
			}
		})
	}
}
