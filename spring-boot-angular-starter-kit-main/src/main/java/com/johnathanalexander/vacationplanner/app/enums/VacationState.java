package com.johnathanalexander.vacationplanner.app.enums;

public enum VacationState {
	NOT_FUNDED("Not Funded"),
	IN_PLANNING("Draft"),
	OFFICIAL("Official"),
	TRIP_COMPLETED("Trip Completed"),
	CANCELLED("Cancelled");
	
	private final String value;
	
	VacationState(String value){
		this.value = value;
	}
	
	public String getDisplayValue() {
		return value;
	}
}
