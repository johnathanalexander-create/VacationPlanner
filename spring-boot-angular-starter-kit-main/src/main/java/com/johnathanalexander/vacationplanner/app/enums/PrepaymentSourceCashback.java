package com.johnathanalexander.vacationplanner.app.enums;

public enum PrepaymentSourceCashback {
	SavorOneDining(0.03f),
	SavorOneDefault(0.01f),
	Quicksilver(0.015f),
	WellsFargo(0.02f),
	Other(0);
	
	private final float cashbackRate;
	
	PrepaymentSourceCashback(float cashbackRate){
		this.cashbackRate = cashbackRate;
	}
	
	public float getRate() {
		return cashbackRate;
	}
}
