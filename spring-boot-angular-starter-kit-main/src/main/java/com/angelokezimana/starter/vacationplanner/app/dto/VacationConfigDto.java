package com.angelokezimana.starter.vacationplanner.app.dto;

import java.util.Set;

import com.angelokezimana.starter.vacationplanner.app.model.VacationConfigItem;

public record VacationConfigDto (
			Long id,
			Set<VacationConfigItemDto> configItems
		) {
}