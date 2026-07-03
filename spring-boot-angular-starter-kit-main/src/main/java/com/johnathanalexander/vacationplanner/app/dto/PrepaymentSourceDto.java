package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

public record PrepaymentSourceDto(
			Long id,
			Boolean active,
			String name,
			BigDecimal cashbackRate
		) {

}
