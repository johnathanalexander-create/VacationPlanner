package com.angelokezimana.starter.vacationplanner.app.dto;

import jakarta.validation.constraints.NotBlank;

public record VacationRequestDto(
									Long id,
									
									@NotBlank(message="The vacation planner needs a name")
									String name
								) {

}
