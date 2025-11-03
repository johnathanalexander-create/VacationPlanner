import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { VacationControllerService } from '../../../services/vacation-planner/vacation-controller.service';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import Vacation from '../../../models/vacation-planner/vacation.model';
@Component({
  selector: 'app-create-new-vacation',
  imports: [
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule,
	ReactiveFormsModule,
	FormsModule,
	MatButtonModule,
	
  ],
  templateUrl: './create-new-vacation.component.html',
  styleUrl: './create-new-vacation.component.scss'
})
export class CreateNewVacationComponent {
	constructor(private formBuilder: FormBuilder, private service: VacationControllerService){}
	
	vacationFormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(100)]]
	});
	
	saveNewVacation(): void{
		const vacationData = {
			...this.vacationFormGroup.value
		};
		
		this.service.saveVacation(vacationData as Vacation)
			.subscribe({
				next: (result: HttpResponse<Vacation> | null | undefined) => {
					
				},
				error: (error: HttpErrorResponse) => {
					console.log("error: " + vacationData.name);
				}
			})
	}
}
