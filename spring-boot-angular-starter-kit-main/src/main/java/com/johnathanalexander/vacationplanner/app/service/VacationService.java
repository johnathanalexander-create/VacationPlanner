package com.johnathanalexander.vacationplanner.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationRequestDto;

public interface VacationService {
	List<VacationDto> getAllVacationsByOwner(Long owner_id);
	List<Map<String, Object>> getVacationListByOwner(Long owner_id);
	VacationDto getVacationById(Long vacation_id);
	VacationDto createVacation(VacationRequestDto vacationRequestDto, String name);
	VacationDto updateVacation(VacationRequestDto vacationRequestDto);
}
