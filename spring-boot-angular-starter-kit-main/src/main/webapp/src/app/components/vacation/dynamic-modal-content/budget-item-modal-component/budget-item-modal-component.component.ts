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
  selector: 'app-budget-item-modal-component',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, MultiSelectComponent, CommonModule],
  templateUrl: './budget-item-modal-component.component.html',
  styleUrl: './budget-item-modal-component.component.scss'
})
export class BudgetItemModalComponent {
	
	updateBudgetItemGroup = this.formBuilder.group({
		vacation_id: [this.modalInputData.vacation_id, []],
		amount: ['', []],
		amountGoal: ['', []],
		cashRequirement: ['', []],
		notes: ['', []]
	});
	
	constructor(public dialogRef: MatDialogRef<BudgetItemModalComponent>,
				private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService ){}
				
	updateBudgetItem(){}
}
