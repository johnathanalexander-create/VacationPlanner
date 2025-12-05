package com.johnathanalexander.vacationplanner.app.dto.packing;

import java.util.Set;

public record LuggageSetDto(
			Long id,
			String title,
			Set<PackSetDto> packSets,
			Set<PackedItemDto> packedItems
		) {

}
