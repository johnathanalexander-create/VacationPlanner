package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.BudgetItemDto;
import com.johnathanalexander.vacationplanner.app.model.BudgetItem;

import io.jsonwebtoken.lang.Collections;

public class BudgetItemMapper {
	public static Set<BudgetItemDto> toBudgetItemListDTO(Set<BudgetItem> budgetItems){
		return budgetItems.stream()
				.map(BudgetItemMapper::toBudgetItemDTO)
				.collect(Collectors.toSet());
	}
	
	public static BudgetItemDto toBudgetItemDTO(BudgetItem item) {
		return new BudgetItemDto(
			item.getId(),
			item.getItem(),
			item.getAmount(),
			item.getGoalAmount(),
			item.getCashRequirement(),
			item.getNotes()
		);
	}
}
