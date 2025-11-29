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
  selector: 'app-prepayment-modal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MultiSelectComponent, CommonModule],
  templateUrl: './prepayment-modal.component.html',
  styleUrl: './prepayment-modal.component.scss'
})
export class PrepaymentModalComponent {
	/*newPrepaymentFormGroup = this.formBuilder.group({
		vacation_id: [this.modalInputData.vacation_id, []],
		description: [this.modalInputData.data.prepayment.description || "", [Validators.required, Validators.maxLength(100)]],
		type: [this.modalInputData.data.prepayment.type || "", []],
		vendor: [this.modalInputData.data.prepayment.vendor || "", [Validators.required]],
		isRefundable: [this.modalInputData.data.prepayment.isRefundable || "", []],
		isRefundRequested: [this.modalInputData.data.prepayment.isRefundRequested || "", []],
		isRefundReceived: [this.modalInputData.data.prepayment.isRefundReceived || "", []],
		amount: [this.modalInputData.data.prepayment.amount || "", [Validators.required]],
		paymentSource: [this.modalInputData.data.prepayment.paymentSource.id || "", [Validators.required]],
		notes: [this.modalInputData.data.prepayment.notes || "", [Validators.maxLength(150)]]
	});*/
	
	newPrepaymentFormGroup = this.formBuilder.group({
		id: [this.modalInputData.data.prepayment.id || 0, []],
		vacation_id: [this.modalInputData.data.vacation_id, []],
		description: [this.modalInputData.data.prepayment.description || "", [Validators.required, Validators.maxLength(100)]],
		type: [this.modalInputData.data.prepayment.type || "", []],
		vendor: [this.modalInputData.data.prepayment.vendor || "", [Validators.required]],
		isRefundable: [this.modalInputData.data.prepayment.isRefundable || "", []],
		isRefundRequested: [this.modalInputData.data.prepayment.isRefundRequested || "", []],
		isRefundReceived: [this.modalInputData.data.prepayment.isRefundReceived || "", []],
		amount: [this.modalInputData.data.prepayment.amount || "", [Validators.required]],
		paymentSource: [this.modalInputData.data.prepayment.paymentSource.id || "", [Validators.required]],
		notes: [this.modalInputData.data.prepayment.notes || "", [Validators.maxLength(150)]]
	});
	
	activePrepaymentSources: PrepaymentSource[] | null = [];
	
	ngOnInit(){
		this.retrievePrepaymentSources();
	}
	
	retrievePrepaymentSources(){
		this.vacationService.getAllPrepaymentSources().subscribe({
			next:(resp) => {
				this.activePrepaymentSources = resp.body;
			},
			error:(err:any) =>{
				
			}
		});
	}
	
	closeModal(): void{
		this.dialogRef.close('thingify');
	}
	
	constructor(public dialogRef: MatDialogRef<PrepaymentModalComponent>,
				private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService ){}
				
	saveNewPrepayment(){
		/*this.vacationService.createNewPrepayment(this.newPrepaymentFormGroup.value)
			.subscribe({
				next: (resp: any) => {
					this.vacationUpdater.updateVacation(resp.body);
					
					this.dialogRef.close();
				}
			});*/
			
		const vacation = this.modalInputData.data.vacation;
		vacation.funding_comps_credits = JSON.stringify(vacation.funding_comps_credits);
		vacation.prepayments.push(this.newPrepaymentFormGroup.value as Prepayment);
			
		this.vacationService.updateVacation(vacation)
			.subscribe({
				next: (resp: any) => {
					this.vacationUpdater.updateVacation(resp.body);
					
					this.dialogRef.close();
				}
			});
	}
	
	isFieldInvalid(name: string): boolean | undefined {
	    return this.formValidationService.isFieldInvalid(this.newPrepaymentFormGroup, name);
	}
}
