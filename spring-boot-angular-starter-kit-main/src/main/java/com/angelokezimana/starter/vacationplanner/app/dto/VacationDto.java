package com.angelokezimana.starter.vacationplanner.app.dto;

import java.util.Set;

import com.angelokezimana.starter.user.model.User;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfig;

public record VacationDto(
							Long id,
							String name,
							String state,
							Long owner,
							VacationConfigDto config,
							Set<PrepaymentDto> prepayments
						 ) {
	
}
