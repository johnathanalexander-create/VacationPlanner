import { Inject, Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';

import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {FormValidationService} from "../../../../../../../services/form-validation/form-validation.service";

import PrepaymentSource from '@models/vacation-planner/prepayment_source.model';

import {VacationControllerService} from '../../../../../../../services/vacation-planner/vacation-controller.service';




@Component({
  selector: 'app-prepaymentsourcemodal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './prepaymentsourcemodal.component.html',
  styleUrl: './prepaymentsourcemodal.component.scss'
})
export class PrepaymentSourceModalComponent {
	
	prepaymentSourceGroup = this.formBuilder.group({
		id: [this.modalInputData.data.prepaymentSource.id, []],
		name: [this.modalInputData.data.prepaymentSource.name || "", []],
		cashbackRate: [this.modalInputData.data.prepaymentSource.cashbackRate || 0.00, []],
		active: [this.modalInputData.data.prepaymentSource.active || false, []],
	});
	
	constructor(public dialogRef: MatDialogRef<PrepaymentSourceModalComponent>,
				private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private controller: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any){}
				
	update(){//
		const payload = {
			id: this.prepaymentSourceGroup.get("id")!.value,
			name: this.prepaymentSourceGroup.get("name")!.value,
			cashbackRate: this.prepaymentSourceGroup.get("cashbackRate")!.value,
			active: this.prepaymentSourceGroup.get("active")!.value
		}
		this.controller.updatePrepaymentSource(payload).subscribe({
			next:(resp) => {
				
			}
		});
	}
	delete(){}
}
