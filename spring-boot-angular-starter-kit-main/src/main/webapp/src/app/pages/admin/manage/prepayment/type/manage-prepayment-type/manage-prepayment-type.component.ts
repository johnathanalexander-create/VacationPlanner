import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
//import PrepaymentType from '../../../../../../models/vacation-planner/prepayment_type.model';

@Component({
  selector: 'app-manage-prepayment-type',
  imports: [],
  templateUrl: './manage-prepayment-type.component.html',
  styleUrl: './manage-prepayment-type.component.scss'
})
export class ManagePrepaymentTypeComponent {
	displayedColumns:string[] = ["name", "cashback_rate", "active"];
	//dataSource = new MatTableDataSource<PrepaymentType>([]);

	editPrepaymentType(element:any){}
}
