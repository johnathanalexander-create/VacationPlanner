package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.SpaDto;
import com.johnathanalexander.vacationplanner.app.model.Spa;

public class SpaMapper {
	public static Set<SpaDto> toSpaListDTO(Set<Spa> spas){
		return spas.stream()
				.map(SpaMapper::toSpaDTO)
				.collect(Collectors.toSet());
	}
	public static SpaDto toSpaDTO(Spa spa) {
		return new SpaDto(
				spa.getId(),
				spa.getDescription(),
				spa.getLocation(),
				spa.getTreatmentDate(),
				spa.getTreatmentTime(),
				spa.getPrice()
		);
	}
}
