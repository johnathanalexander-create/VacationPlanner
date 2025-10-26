package com.angelokezimana.starter.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.angelokezimana.starter.vacationplanner.app.dto.ConfirmationDto;
import com.angelokezimana.starter.vacationplanner.app.model.Confirmation;

public class ConfirmationMapper {
	public static Set<ConfirmationDto> toConfirmationDTOList(Set<Confirmation> confirmations) {
		return confirmations.stream()
				.map(ConfirmationMapper::toConfirmationDTO)
				.collect(Collectors.toSet());
	}
	public static ConfirmationDto toConfirmationDTO(Confirmation confirmation) {
		return new ConfirmationDto(
				confirmation.getId(),
				confirmation.getDescription(),
				confirmation.getType(),
				confirmation.getConfirmationCode(),
				confirmation.getDate(),
				confirmation.getTime(),
				confirmation.getNotes()
		);
	}
}
