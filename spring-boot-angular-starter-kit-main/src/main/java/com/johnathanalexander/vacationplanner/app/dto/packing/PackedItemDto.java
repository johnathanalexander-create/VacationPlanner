package com.johnathanalexander.vacationplanner.app.dto.packing;

import com.johnathanalexander.vacationplanner.app.enums.Mandatory;
import com.johnathanalexander.vacationplanner.app.enums.Status;

public record PackedItemDto(
		Long id,
		String title,
		Status status,
		Mandatory mandatory
	){
	
}
