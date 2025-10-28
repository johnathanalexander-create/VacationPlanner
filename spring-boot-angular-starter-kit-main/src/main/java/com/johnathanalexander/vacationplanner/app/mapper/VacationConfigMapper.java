package com.johnathanalexander.vacationplanner.app.mapper;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigDto;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;

public class VacationConfigMapper {
	public static VacationConfigDto toVacationConfigDTO(VacationConfig config) {
		return new VacationConfigDto(
				config.getId(),
				VacationConfigItemMapper.toVacationConfigItemDTOList(config.getVacationConfigItems())
		);
	}
}
