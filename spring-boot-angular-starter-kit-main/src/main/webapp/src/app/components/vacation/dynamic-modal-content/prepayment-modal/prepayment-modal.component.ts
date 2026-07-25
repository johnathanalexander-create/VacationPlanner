import { Inject, Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {HttpResponse} from '@angular/common/http';

import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import {FormValidationService} from "../../../../services/form-validation/form-validation.service";

import PrepaymentSource from '@models/vacation-planner/prepayment_source.model';
import Prepayment from '@models/vacation-planner/prepayment.model';

import {VacationControllerService} from '../../../../services/vacation-planner/vacation-controller.service';
import {VacationUpdaterService} from '../../../../services/vacation-updater/vacation-updater.service';





@Component({
  selector: 'app-prepayment-modal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, CommonModule, MatIconModule],
  templateUrl: './prepayment-modal.component.html',
  styleUrl: './prepayment-modal.component.scss'
})
export class PrepaymentModalComponent {
	
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
		paymentSource: [this.modalInputData.data.prepayment.paymentSource || "", [Validators.required]],
		notes: [this.modalInputData.data.prepayment.notes || "", [Validators.maxLength(150)]]
	});
	
	//paymentSource: [this.modalInputData.data.prepayment.paymentSource || "", [Validators.required]],
	
	activePrepaymentSources: PrepaymentSource[] | null = [];
	
	ngOnInit(){
		this.retrievePrepaymentSources();
		console.log(this.newPrepaymentFormGroup);
	}
	
	deletePrepayment(){
		alert("deletrius");
	}
	
	retrievePrepaymentSources(){
		this.vacationService.getAllActivePrepaymentSources().subscribe({
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
				
	save(){

		const vacation = this.modalInputData.data.vacation;
		
		const id = this.newPrepaymentFormGroup.get("id")?.value;
		const description = this.newPrepaymentFormGroup.get("description")?.value;
		const type = this.newPrepaymentFormGroup.get("type")?.value;
		const vendor = this.newPrepaymentFormGroup.get("vendor")?.value;
		const isRefundable = this.newPrepaymentFormGroup.get("isRefundable")?.value;
		const isRefundRequested = this.newPrepaymentFormGroup.get("isRefundRequested")?.value;
		const isRefundReceived = this.newPrepaymentFormGroup.get("isRefundReceived")?.value;
		const amount = this.newPrepaymentFormGroup.get("amount")?.value;
		const paymentSource = this.newPrepaymentFormGroup.get("paymentSource")?.value;
		const notes = this.newPrepaymentFormGroup.get("notes")?.value;
		
		if(id == 0){
			vacation.prepayments.push(this.newPrepaymentFormGroup.value as Prepayment);
		}else{
			vacation.prepayments.forEach(function(p:Prepayment){
				if(id == p.id){
					
					
					
					p.description = description;
					p.type = type;
					p.vendor = vendor;
					p.isRefundable = isRefundable;
					p.isRefundRequested = isRefundRequested;
					p.isRefundReceived = isRefundReceived;
					p.amount = amount;
					p.paymentSource = paymentSource;
					p.notes = notes;
				}
			});
		}
		
		console.log("saving this durn");
		console.log(vacation);
			
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
