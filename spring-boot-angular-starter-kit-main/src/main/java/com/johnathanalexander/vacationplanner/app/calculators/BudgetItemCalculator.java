package com.johnathanalexander.vacationplanner.app.calculators;

import java.math.BigDecimal;
import java.util.Set;


import com.johnathanalexander.vacationplanner.app.model.BudgetItem;

//@Service
public class BudgetItemCalculator {
	
	/*
	 * NAME: calculateBudgetBuffer
	 * DESCRIPTION: Given a set of Budget Items, calculate the budget buffer assuming that the vacation has enabled budget buffering
	 * 
	 * 
	 * 
	 * */
	public static BigDecimal calculateBudgetBuffer(Set<BudgetItem> budgetItems, double bufferRate) {
		
		BigDecimal total = BigDecimal.ZERO;
		BigDecimal buffer = new BigDecimal(bufferRate);
		
		for(BudgetItem item : budgetItems) {
			if(item.getAmount().compareTo(BigDecimal.ZERO) > 0) {
				total.add(item.getAmount());
			}
		}
		
		return total.multiply(buffer);
	}
}
