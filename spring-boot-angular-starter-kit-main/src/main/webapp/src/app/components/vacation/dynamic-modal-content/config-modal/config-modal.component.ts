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
import VacationConfigItem from '@models/vacation-planner/vacation_config_item.model';
import {SnackBarService} from '../../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-config-modal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './config-modal.component.html',
  styleUrl: './config-modal.component.scss'
})
export class ConfigModalComponent {
	configItemGroup = this.formBuilder.group({
		vacation_id: [this.modalInputData.vacation_id, []],
		id: [this.modalInputData.data.config.id, []],
		config_key: [this.modalInputData.data.config.config_key, []],
		config_value: [this.modalInputData.data.config.config_value, []],
		config_notes: [this.modalInputData.data.config.config_notes, []],
		config_type: [this.modalInputData.data.config.config_type, []]
	})
	
	constructor(private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService,
				public dialogRef: MatDialogRef<ConfigModalComponent>,
				private snackbar: SnackBarService
	){}
	
	processValueByType(value:string, type:string):boolean{
		
		if(value == "" || type == ""){
			return true;
		}
		
		value = value.toLowerCase();
		type = type.toLowerCase();
		
		switch(type){
			case "string":
				return true;
			case "number":
				const regex = /^\d+(\.\d+)?$/;//regex allowing numerical caharacters and a single decimal
				
				return regex.test(value);
			case "boolean":
				return (value == "true" || value == "false");
			case "date":
				const date = new Date(value);
				return (!isNaN(date.getTime()) && value.trim() !== '');
		}
		
		return false;
	}
	
	updateConfigItem(){
			
			const isValueTypematched = this.processValueByType(this.configItemGroup.value.config_value, this.configItemGroup.value.config_type);
			
			if(!isValueTypematched){
				this.snackbar.showMessage("This Config Item requires input of the type " + this.configItemGroup.value.config_type.toUpperCase(), "error");
				return;
			}
			
			this.vacationService.saveConfigItem(this.configItemGroup.value as VacationConfigItem)
					.subscribe({
					next: (resp:any) =>{
						this.vacationUpdater.updateVacation(resp.body);
						this.dialogRef.close();
					}
				})
			
	}
}
