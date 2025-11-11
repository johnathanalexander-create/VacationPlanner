package com.johnathanalexander.vacationplanner.app.dto;

import java.util.Set;

import com.johnathanalexander.vacationplanner.app.model.Confirmation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.user.model.User;

public record VacationDto(
							Long id,
							String name,
							String state,
							Long owner,
							String notes,
							VacationConfigDto config,
							Set<PrepaymentDto> prepayments,
							Set<BudgetItemDto> budgetItems,
							Set<SpaDto> spas,
							String funding_comps_credits,
							Set<ConfirmationDto> confirmations
						 ) {
	
}
