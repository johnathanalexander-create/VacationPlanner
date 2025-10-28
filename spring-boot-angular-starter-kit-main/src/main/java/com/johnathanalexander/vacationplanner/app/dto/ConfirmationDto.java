package com.johnathanalexander.vacationplanner.app.dto;

public record ConfirmationDto(
			Long id,
			String description,
			String type,
			String confirmationCode,
			String date,
			String time,
			String notes
		) {
	
}
