package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

public record FCCDto(
		Long id,
		String fccTitle,
		BigDecimal fccAmount
) {
	
}
