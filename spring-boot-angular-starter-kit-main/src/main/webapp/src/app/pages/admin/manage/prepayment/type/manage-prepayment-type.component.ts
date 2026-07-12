import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import PrepaymentType from '@models/vacation-planner/prepayment_type.model';

import { PrepaymentService } from '../../../../../services/admin/prepayment/prepayment.service';
import { VacationControllerService } from "../../../../../services/vacation-planner/vacation-controller.service";
import { ModalService } from '../../../../../services/utility/modal-service/modal-service.service';

@Component({
  selector: 'app-manage-prepayment-type',
  imports: [MatTableModule, MatTooltipModule, MatSort, MatToolbar, MatToolbarRow, MatIconModule, FormsModule],
  templateUrl: './manage-prepayment-type.component.html',
  styleUrl: './manage-prepayment-type.component.scss'
})
export class ManagePrepaymentTypeComponent {
	displayedColumns:string[] = ["name", "active"];
		dataSource = new MatTableDataSource<PrepaymentType>([]);
		
		showActiveOnly: boolean = true;
		
		@ViewChild(MatSort) sort!: MatSort;
		
		constructor(private service:PrepaymentService,
					private vacationService: VacationControllerService,
					private modal: ModalService){}
		
		ngOnInit(){
			this.load();
			

		}
		ngAfterViewInit(){
			this.dataSource.sort = this.sort;
			
			this.applyActiveFilter();
		}
		
		load(){
			this.vacationService.getAllPrepaymentTypes().subscribe({
				next:(resp) => {
					this.dataSource.data = resp?.body ?? [];
				}
			});
		}
		
		applyActiveFilter(){
			const searchString = this.showActiveOnly.toString().toLowerCase();
			this.dataSource.filter = searchString;
		}

		async editPrepaymentType(prepaymentSource:any){
			var data = {
				prepaymentSource:prepaymentSource
			}
			
			if(prepaymentSource){
				const result = await this.modal.generateAsyncModal("prepaymenttype", data);
				
				if(result.length && result.length >= 0){
					this.dataSource.data = result;
				}
				
			}
		}
		async addType(){
			const result = await this.modal.generateAsyncModal("prepaymenttype", {});

			if(result.length && result.length >= 0){
				this.dataSource.data = result;
			}
		}
}
