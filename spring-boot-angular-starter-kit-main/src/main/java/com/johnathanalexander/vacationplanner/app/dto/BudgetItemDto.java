package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

public record BudgetItemDto(
			Long id,
			String item,
			BigDecimal amount,
			BigDecimal amountGoal,
			BigDecimal cashRequirement,
			String notes,
			byte order
		) {

}
