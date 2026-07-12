package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentTypeDto;
import com.johnathanalexander.vacationplanner.app.model.PrepaymentType;

public class PrepaymentTypeMapper {
	public static Set<PrepaymentTypeDto> toPrepaymentTypeListDTO(List<PrepaymentType> prepaymentTypes){
		return prepaymentTypes.stream()
				.map(PrepaymentTypeMapper::toPrepaymentTypeDTO)
				.collect(Collectors.toSet());
	}
	
	public static PrepaymentTypeDto toPrepaymentTypeDTO(PrepaymentType type) {
		return new PrepaymentTypeDto(
				type.getId(),
				type.isActive(),
				type.getName()
		);
	}
}
