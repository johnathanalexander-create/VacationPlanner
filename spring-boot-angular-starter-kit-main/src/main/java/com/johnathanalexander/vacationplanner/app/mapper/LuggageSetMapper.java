package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.packing.LuggageSetDto;
import com.johnathanalexander.vacationplanner.app.model.packing.LuggageSet;

public class LuggageSetMapper {
	public static LuggageSetDto toLuggageSetDto(LuggageSet luggageSet) {
		return new LuggageSetDto(
			luggageSet.getId(),
			luggageSet.getTitle(),
			luggageSet.getPackSets() != null ? (PackSetMapper.toPackSetDtoList(luggageSet.getPackSets())) : null,
			luggageSet.getPackedItems() != null ? (PackedItemMapper.toPackedItemListDTO(luggageSet.getPackedItems())) : null
		);
	}
	public static Set<LuggageSetDto> toLuggageSetDTOList(Set<LuggageSet> luggageSet){
		return luggageSet.stream()
				.map(LuggageSetMapper::toLuggageSetDto)
				.collect(Collectors.toSet());
	}
}
