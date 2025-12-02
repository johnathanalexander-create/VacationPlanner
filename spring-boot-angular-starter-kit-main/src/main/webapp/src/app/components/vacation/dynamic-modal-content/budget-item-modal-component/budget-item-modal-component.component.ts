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

import {FormValidationService} from "../../../../services/form-validation/form-validation.service";

import PrepaymentSource from '../../../../models/vacation-planner/prepayment_source.model';
import Prepayment from '../../../../models/vacation-planner/prepayment.model';
import BudgetItem from '../../../../models/vacation-planner/budget_item.model';

import {VacationControllerService} from '../../../../services/vacation-planner/vacation-controller.service';
import {VacationUpdaterService} from '../../../../services/vacation-updater/vacation-updater.service';


@Component({
  selector: 'app-budget-item-modal-component',
  imports: [MatSelectModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  templateUrl: './budget-item-modal-component.component.html',
  styleUrl: './budget-item-modal-component.component.scss'
})
export class BudgetItemModalComponent {
	
	updateBudgetItemGroup = this.formBuilder.group({
		vacation_id: [this.modalInputData.vacation_id, []],
		id: [this.modalInputData.data.budgetItem.id, []],
		item: [this.modalInputData.data.budgetItem.item, []],
		amount: [this.modalInputData.data.budgetItem.amount, []],
		amountGoal: [this.modalInputData.data.budgetItem.amountGoal, []],
		cashRequirement: [this.modalInputData.data.budgetItem.cashRequirement, []],
		notes: [this.modalInputData.data.budgetItem.notes, []]
	});
	
	constructor(public dialogRef: MatDialogRef<BudgetItemModalComponent>,
				private formBuilder: FormBuilder,
				private formValidationService: FormValidationService,
				private vacationService: VacationControllerService,
				@Inject(MAT_DIALOG_DATA) public modalInputData: any,
				private vacationUpdater: VacationUpdaterService ){}
				
	/*delete(){
		var vacation = this.modalInputData.data.vacation;
		
		var budgetItems:BudgetItem[] = vacation.budgetItems;
		
		budgetItems.forEach((budgetItem: BudgetItem, index: number) => {
			if(budgetItem.id == this.updateBudgetItemGroup.value.id && budgetItem.id > 0){
				//vacation.budgetItems.splice(index, 1);
				//vacation.budgetItems = vacation.budgetItems.filter(bi:any => bi.id != budgetItem.id);
				budgetItems = budgetItems.splice(index, 1);
			}
		});
		
		console.log(budgetItems);
		
		vacation.budgetItems = budgetItems;
		
		vacation.funding_comps_credits = JSON.stringify(vacation.funding_comps_credits);
		
		this.vacationService.updateVacation(vacation)
			.subscribe({
				next: (resp:any) => {
					
				}
			})
	}*/
	
	delete(){
		var vacation = this.modalInputData.data.vacation;
		var budgetItems:BudgetItem[] = vacation.budgetItems;
		
		budgetItems.forEach((budgetItem: BudgetItem, index: number) => {
			if(budgetItem.id == this.updateBudgetItemGroup.value.id && budgetItem.id > 0){
				this.vacationService.deleteBudgetItem(budgetItem.id);
			}
		});
	}
				
	updateBudgetItem(){
		const vacation = this.modalInputData.data.vacation;
		
		
		var biGroup = this.updateBudgetItemGroup.value;
		var budgetItems:BudgetItem[] = vacation?.budgetItems;
		
		if(budgetItems && budgetItems.length > 0){
			var updated = false;

			budgetItems.forEach(budgetItem => {

				if(biGroup.id == budgetItem.id && budgetItem.id > 0){
					budgetItem.item = biGroup.item;
					budgetItem.amount = biGroup.amount;
					budgetItem.amountGoal = biGroup.amountGoal;
					budgetItem.cashRequirement = biGroup.cashRequirement;
					budgetItem.notes = biGroup.notes;
					updated = true;
				}
			});

			vacation.budgetItems = budgetItems;
			
			if(!updated){
				vacation.budgetItems.push(biGroup as BudgetItem);
			}

			vacation.funding_comps_credits = JSON.stringify(vacation.funding_comps_credits);

			this.vacationService.updateVacation(vacation)
				.subscribe({
					next: (resp:any) => {
						this.vacationUpdater.updateVacation(resp.body);
						this.dialogRef.close();
					}
				})
			
		}
		
	}
}
