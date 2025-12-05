package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.packing.PackedItemDto;
import com.johnathanalexander.vacationplanner.app.model.packing.PackedItem;

public class PackedItemMapper {
	public static Set<PackedItemDto> toPackedItemListDTO(Set<PackedItem> packedItems){
		return packedItems.stream()
				.map(PackedItemMapper::toPackedItemDTO)
				.collect(Collectors.toSet());
	}
	
	public static PackedItemDto toPackedItemDTO(PackedItem item) {
		return new PackedItemDto(
			item.getId(),
			item.getTitle(),
			item.getStatus(),
			item.getMandatory()
		);
	}
}
