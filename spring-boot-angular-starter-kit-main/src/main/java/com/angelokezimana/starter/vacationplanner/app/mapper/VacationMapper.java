package com.angelokezimana.starter.vacationplanner.app.mapper;

import com.angelokezimana.starter.vacationplanner.app.dto.VacationDto;
import com.angelokezimana.starter.vacationplanner.app.model.Vacation;

public class VacationMapper {
	public static VacationDto toVacationDto(Vacation vacation) {
		return new VacationDto(
			vacation.getId(),
			vacation.getName(),
			vacation.getState(),
			vacation.getOwner(),
			vacation.getNotes(),
			vacation.getVacationConfig() != null ? (VacationConfigMapper.toVacationConfigDTO(vacation.getVacationConfig())) : null,
			vacation.getPrepayments() != null ? (PrepaymentMapper.toPrepaymentListDTO(vacation.getPrepayments())) : null,
			vacation.getFundingCompsCredits(),
			vacation.getConfirmations() != null ? (ConfirmationMapper.toConfirmationDTOList(vacation.getConfirmations())) : null
		);
	}
}
