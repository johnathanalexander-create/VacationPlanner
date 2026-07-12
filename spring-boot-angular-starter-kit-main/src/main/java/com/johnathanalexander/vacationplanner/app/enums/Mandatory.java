package com.johnathanalexander.vacationplanner.app.enums;

public enum Mandatory {
	Mandatory("Mandatory"), Recommended("Recommended"), Optional("Optional");
	
	private final String mandatory;
	
	Mandatory(String mandatory){
		this.mandatory = mandatory;
	}
	
	public String toJson() {
		return mandatory;
	}
}
