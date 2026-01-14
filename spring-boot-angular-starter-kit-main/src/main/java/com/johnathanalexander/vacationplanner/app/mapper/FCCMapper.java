package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.FCCDto;
import com.johnathanalexander.vacationplanner.app.model.FCC;

public class FCCMapper {
	public static Set<FCCDto> toFCCDTOList(Set<FCC> fccList){
		return fccList.stream()
				.map(FCCMapper::toFCCDTO)
				.collect(Collectors.toSet());
	}
	
	public static FCCDto toFCCDTO(FCC fcc) {
		return new FCCDto(
			fcc.getId(),
			fcc.getFCCTitle(),
			fcc.getFCCAmount()
		);
	}
}
