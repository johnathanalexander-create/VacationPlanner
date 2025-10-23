package com.angelokezimana.starter.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.angelokezimana.starter.vacationplanner.app.dto.VacationConfigDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationConfigItemDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationDto;
import com.angelokezimana.starter.vacationplanner.app.model.Vacation;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfig;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfigItem;

public class VacationMapper {
	public static VacationDto toVacationDto(Vacation vacation) {
		return new VacationDto(
			vacation.getId(),
			vacation.getName(),
			vacation.getState(),
			vacation.getOwner(),
			vacation.getVacationConfig() != null ? (VacationMapper.toVacationConfigDTO(vacation.getVacationConfig())) : null
		);
	}
	
	public static VacationConfigDto toVacationConfigDTO(VacationConfig config) {
		return new VacationConfigDto(
				config.getId(),
				VacationMapper.toVacationConfigItemDTOList(config.getVacationConfigItems())
		);
	}
	
	public static Set<VacationConfigItemDto> toVacationConfigItemDTOList(Set<VacationConfigItem> configItems) {
		return configItems.stream()
				.map(VacationMapper::toVacationConfigItemDTO)
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
