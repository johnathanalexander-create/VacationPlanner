package com.angelokezimana.starter.vacationplanner.app.dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;

public record VacationRequestDto(
									Long id,
									
									@NotBlank(message="The vacation planner needs a name")
									String name,
									
									String state,
									Long owner,
									String notes,
									VacationConfigDto config,
									Set<PrepaymentDto> prepayments,
									String funding_comps_credits
								) {
}
