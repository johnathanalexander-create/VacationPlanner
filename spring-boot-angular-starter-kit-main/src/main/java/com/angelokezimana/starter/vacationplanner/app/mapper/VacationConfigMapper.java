package com.angelokezimana.starter.vacationplanner.app.mapper;

import com.angelokezimana.starter.vacationplanner.app.dto.VacationConfigDto;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfig;

public class VacationConfigMapper {
	public static VacationConfigDto toVacationConfigDTO(VacationConfig config) {
		return new VacationConfigDto(
				config.getId(),
				VacationConfigItemMapper.toVacationConfigItemDTOList(config.getVacationConfigItems())
		);
	}
}
