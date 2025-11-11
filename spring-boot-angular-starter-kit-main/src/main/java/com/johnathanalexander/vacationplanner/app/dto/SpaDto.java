package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

public record SpaDto(
			Long id,
			String description,
			String location,
			String treatmentDate,
			String treatmentTime,
			BigDecimal price
		) {

}
