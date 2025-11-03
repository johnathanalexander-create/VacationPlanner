package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

public record PrepaymentSourceRequestDto(
			Long id,
			boolean active,
			String name,
			BigDecimal cashback_rate
		) {
	
}
