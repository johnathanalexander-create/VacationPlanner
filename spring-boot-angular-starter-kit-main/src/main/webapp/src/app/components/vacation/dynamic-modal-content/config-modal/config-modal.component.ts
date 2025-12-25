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
import VacationConfigItem from '../../../../models/vacation-planner/vacation_config_item.model';

@Component({
  selector: 'app-config-modal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MultiSelectComponent, CommonModule],
  templateUrl: './config-modal.component.html',
  styleUrl: './config-modal.component.scss'
})
export class ConfigModalComponent {
	configItemGroup = this.formBuilder.group({
		vacation_id: [this.modalInputData.vacation_id, []],
		id: [this.modalInputData.data.config.id, []],
		config_key: [this.modalInputData.data.config.config_key, []],
		config_value: [this.modalInputData.data.config.config_value, []],
		config_notes: [this.modalInputData.data.config.config_notes, []]
	})
	
	constructor(private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService,
				public dialogRef: MatDialogRef<ConfigModalComponent>
	){}
	
	updateConfigItem(){
		/*const vacation = this.modalInputData.data.vacation;
		
		console.log("updateconfigitems");
		console.log("vacation");
		console.log(vacation);
		
		var ciGroup = this.configItemGroup.value;
		var configItems:VacationConfigItem[] = vacation?.config.configItems;
		
		console.log("ci");
		console.log(configItems);
		
		if(configItems && configItems.length > 0){

			configItems.forEach(configItem =>{
				if(ciGroup.config_key == configItem.config_key){
					configItem.config_value = ciGroup.config_value;
					configItem.config_notes = ciGroup.config_notes;
				}
			});
			
			vacation.config.configItems = configItems;
			
			vacation.funding_comps_credits = JSON.stringify(vacation.funding_comps_credits);*/
			
			
			
			this.vacationService.saveConfigItem(this.configItemGroup.value as VacationConfigItem)
				.subscribe({
					next: (resp:any) =>{
						console.log("RESP RESP RESP");
						console.log(resp);
						this.vacationUpdater.updateVacation(resp.body);
						this.dialogRef.close();
					}
				})
		//}
	}
}
