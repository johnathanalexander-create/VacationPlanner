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




@Component({
  selector: 'app-prepaymentsourcemodal',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './prepaymentsourcemodal.component.html',
  styleUrl: './prepaymentsourcemodal.component.scss'
})
export class PrepaymentSourceModalComponent {
	
	prepaymentSourceGroup = this.formBuilder.group({
		id: [this.modalInputData.data.prepaymentSource.id, []],
		name: [this.modalInputData.data.prepaymentSource.name, []],
		cashbackRate: [this.modalInputData.data.prepaymentSource.cashbackRate, []],
		active: [this.modalInputData.data.prepaymentSource.active, []],
	});
	
	constructor(public dialogRef: MatDialogRef<PrepaymentSourceModalComponent>,
				private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any){}
				
	update(){}
	delete(){}
}
