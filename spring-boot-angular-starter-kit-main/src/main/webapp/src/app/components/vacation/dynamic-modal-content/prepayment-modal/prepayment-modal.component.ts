import { Component } from '@angular/core';
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

@Component({
  selector: 'app-prepayment-modal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MultiSelectComponent, CommonModule],
  templateUrl: './prepayment-modal.component.html',
  styleUrl: './prepayment-modal.component.scss'
})
export class PrepaymentModalComponent {
	newPrepaymentFormGroup = this.formBuilder.group({
		description: ['', [Validators.required, Validators.maxLength(100)]],
		type: ['', [Validators.required]],
		vendor: ['', [Validators.required]],
		refundable: ['', []],
		amount: ['', [Validators.required]],
		payment_source: ['', [Validators.required]],
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
				private vacationService: VacationControllerService){}
				
	saveNewPrepayment(){
		
	}
	
	isFieldInvalid(name: string): boolean | undefined {
	    return this.formValidationService.isFieldInvalid(this.newPrepaymentFormGroup, name);
	}
}
