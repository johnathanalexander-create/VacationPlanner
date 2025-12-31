package com.johnathanalexander.vacationplanner.app.mapper;

import com.johnathanalexander.vacationplanner.app.enums.PrepaymentSourceCashback;

public class PrepaymentCashbackRateMapper {
	public static float toCashbackRate(String paymentSource) {
		switch(paymentSource) {
			case "Wells Fargo Credit Card":
				return PrepaymentSourceCashback.WellsFargo.getRate();
			case "Quicksilver Credit Card":
				return PrepaymentSourceCashback.Quicksilver.getRate();
			case "SavorOne CC - Dining":
				return PrepaymentSourceCashback.SavorOneDining.getRate();
			case "SavorOne Credit Card":
				return PrepaymentSourceCashback.SavorOneDefault.getRate();
			default:
				return PrepaymentSourceCashback.Other.getRate();
			
		}
	}
}
