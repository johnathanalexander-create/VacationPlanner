package com.johnathanalexander.vacationplanner.app.dto;

import java.util.Set;

import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;

public record VacationConfigDto (
			Long id,
			Set<VacationConfigItemDto> configItems
		) {
}