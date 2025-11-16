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
import PrepaymentSource from '../../../../models/vacation-planner/prepayment_source.model';
import { CommonModule } from '@angular/common';
import Prepayment from '../../../../models/vacation-planner/prepayment.model';
import {HttpResponse} from '@angular/common/http';
import {VacationUpdaterService} from '../../../../services/vacation-updater/vacation-updater.service';






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
		key: [this.modalInputData.data.fcc.key || "", [Validators.required]],
		value: [this.modalInputData.data.fcc.value.value || "", []]		
	});
	
	constructor(private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService,
				public dialogRef: MatDialogRef<FCCModalComponent>
	){}
	
	submitFCC(){
		
		var fccFromModal = this.fccItemGroup.value;
		var createNewFCC = this.modalInputData.data.createNewFCC;
		
		var fcc = this.modalInputData.data.vacation.funding_comps_credits;
		
		if(createNewFCC){
			//Need to add a new object to fcc
			fcc[fccFromModal.key] = {
				value:fccFromModal.value,
				isEditing: false
			}
		}else{
			//Need to update an existing fcc object
			
			for(var fccKey in fcc){
				if(fccKey == fccFromModal.key){
					fcc[fccKey] = {
						value: fccFromModal.value,
						idEditing: false
					}
				}
			}
		}		
		
		this.vacationService.setFCC(fcc, this.fccItemGroup.value.vacation_id).subscribe({
			next:(resp:any) =>{
				this.vacationUpdater.updateVacation(resp);
				this.dialogRef.close();				
			}
		})
	}
}
