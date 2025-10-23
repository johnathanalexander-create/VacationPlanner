import {Component, Signal, Input} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";
import {VacationControllerService} from '../../services/vacation-planner/vacation-controller.service';
import Vacation from '../../models/vacation-planner/vacation.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TripDashboardComponent } from '../../components/vacation/trip-dashboard/trip-dashboard.component';



@Component({
    selector: 'app-home',
    imports: [MatToolbarModule, MatIcon, MatTableModule, MatButtonModule, MatTabsModule, RouterLink, CommonModule, FormsModule, TripDashboardComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

  /*posts: Signal<Post[] | [] | null> = toSignal(this.postService.getPosts().pipe(
    map(response => response.body)), {initialValue: []});*/

  /*loading:Signal<boolean> = toSignal(this.postService.loadingStatus(), {initialValue:true});*/
  
  selectedVacation?: Vacation | null = null;
  
  vacations: Signal<Vacation[] | [] | null> = toSignal(this.vacationService.getVacationsByUserId().pipe(
	map(response => response.body),
	
	), {initialValue: []}

  );
  
  loading:Signal<boolean> = toSignal(this.vacationService.loadingStatus(), {initialValue:true});

  constructor(private vacationService: VacationControllerService) {
	this.vacationService.getVacationsByUserId();
  }
  attempt(){
	const v = this.vacations();
	if(v){
		console.log(v[0].config)
	}
  }
}
