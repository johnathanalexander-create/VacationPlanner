package com.angelokezimana.starter.vacationplanner.app.dto;

public record VacationConfigItemDto(
			Long id,
			String config_key,
			String config_label,
			String config_value,
			String config_notes,
			boolean primary_config,
			boolean required
		) {}
