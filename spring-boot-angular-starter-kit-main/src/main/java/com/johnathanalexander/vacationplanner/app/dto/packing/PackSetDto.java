package com.johnathanalexander.vacationplanner.app.dto.packing;

import java.util.Set;

public record PackSetDto(
			Long id,
			Set<PackedItemDto> packedItems,
			String title
		) {

}
