package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.packing.PackSetDto;
import com.johnathanalexander.vacationplanner.app.model.packing.PackSet;

public class PackSetMapper {
	public static Set<PackSetDto> toPackSetDtoList(Set<PackSet> packsetList){
		return packsetList.stream()
				.map(PackSetMapper::toPackSetDto)
				.collect(Collectors.toSet());
	}
	
	public static PackSetDto toPackSetDto(PackSet packset) {
		return new PackSetDto(
			packset.getId(),
			packset.getPackedItems() != null ? (PackedItemMapper.toPackedItemListDTO(packset.getPackedItems())) : null,
			packset.getTitle()
		);
	}
}
