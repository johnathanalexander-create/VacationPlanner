import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';

import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { MatTabChangeEvent } from '@angular/material/tabs';

import {WebVacationUtilityService} from '../../../services/utility/web-vacation-utility.service';

import Vacation from '../../../models/vacation-planner/vacation.model';



@Component({
  selector: 'app-calendar-component',
  imports: [FullCalendarModule],
  templateUrl: './calendar-component.component.html',
  styleUrl: './calendar-component.component.scss'
})
export class CalendarComponent {
	@ViewChild('calendar') calendarComponent!: FullCalendarComponent;

	@Input()
	set active(value: boolean){
		if(value){
			setTimeout(() => {
				this.calendarComponent.getApi().updateSize();
			}, 100)
		}
	}
	
	private _selectedVacation: Vacation | null = null;
	
	@Input()
	set selectedVacation(vac:Vacation | null | undefined){
		this._selectedVacation = vac ?? null;
		if(vac){
			this.calendarOptions.events = vac.meta.calendarEvents;
			
			var calendarStartDate = new Date(this.utility.getVacationValue(vac, "trip_start_date", true, ""));
			var calendarEndDate = new Date(this.utility.getVacationValue(vac, "trip_end_date", true, ""));
			
			this.calendarOptions.validRange.start = this.getDateString(calendarStartDate);
			this.calendarOptions.validRange.end = this.getDateString(calendarEndDate);			
		}
	}
	
	get selectedVacation(){
		return this._selectedVacation;
	}
	
	constructor(private utility: WebVacationUtilityService){}
		 
	calendarOptions: CalendarOptions & {
		validRange: { start: string; end: string}
	} = {
	    plugins: [dayGridPlugin, interactionPlugin],
	    initialView: 'dayGridWeek',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'addEventButton'
		},
		customButtons: {
			addEventButton: {
				text: 'Add Event',
				click: () => {
					this.addEvent();
				}
			}
		},
		editable: true,
		selectable: true,
	    weekends: true,
		validRange: {
			start: '',
			end: ''
		},
	    events: []
	 };
	 
	 getDateString(date:Date):string{
		if(date){
			var year = date.getUTCFullYear();
			var month = date.getUTCMonth();
			var day = date.getUTCDate();
			
			//Date object returns 0-11 for month, so adding 1 is critical
			return year + "-" + ((month + 1).toString().padStart(2, '0')) + "-" + day;
		}
		
		return "";
	 }
	 
	 addEvent(){
		//gen modal, get data, save
		
		this.calendarComponent.getApi().addEvent({
			title: 'New Event',
			start: new Date('2026-05-16'),
			allDay: true,
			color: "#f44336"
		});
	 }

}
