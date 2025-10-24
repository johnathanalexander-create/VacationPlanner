package com.angelokezimana.starter.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.angelokezimana.starter.vacationplanner.app.dto.VacationConfigItemDto;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfigItem;

public class VacationConfigItemMapper {
	public static Set<VacationConfigItemDto> toVacationConfigItemDTOList(Set<VacationConfigItem> configItems) {
		return configItems.stream()
				.map(VacationConfigItemMapper::toVacationConfigItemDTO)
				.collect(Collectors.toSet());
	}
	public static VacationConfigItemDto toVacationConfigItemDTO(VacationConfigItem configItem) {
		return new VacationConfigItemDto(
				configItem.getId(),
				configItem.getConfigKey(),
				configItem.getConfigLabel(),
				configItem.getConfigValue(),
				configItem.getConfig_notes(),
				configItem.isPrimary_config(),
				configItem.isRequired()
		);
				
	}
}
