package com.johnathanalexander.vacationplanner.app.dto;

import java.util.Set;

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.app.model.FCC;

import jakarta.validation.constraints.NotBlank;

@TODO("FCC to FCCDto and use conversion in the vacation service impl")
public record VacationRequestDto(
									Long id,
									
									@NotBlank(message="The vacation planner needs a name")
									String name,
									String state,
									Long owner,
									String notes,
									VacationConfigDto config,
									Set<PrepaymentDto> prepayments,
									Set<BudgetItemDto> budgetItems,
									Set<FCCDto> funding_comps_credits
								) {
}
