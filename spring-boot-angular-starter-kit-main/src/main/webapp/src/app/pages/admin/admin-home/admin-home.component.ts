import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
	test = {
		numberOfActiveVacations:5,
		numberOfInProgressVacations:1
	}
}
