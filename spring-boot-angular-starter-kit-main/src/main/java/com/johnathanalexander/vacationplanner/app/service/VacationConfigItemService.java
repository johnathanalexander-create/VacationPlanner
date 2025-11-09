package com.johnathanalexander.vacationplanner.app.service;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;

public interface VacationConfigItemService {
	VacationDto saveVacationConfigItem(VacationConfigItemDto dto);
}
