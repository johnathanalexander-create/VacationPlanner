package com.johnathanalexander.vacationplanner.app.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.exception.VacationConfigItemNotFoundException;
import com.johnathanalexander.vacationplanner.app.mapper.VacationMapper;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.repository.VacationConfigItemRepository;
import com.johnathanalexander.vacationplanner.app.repository.VacationRepository;
import com.johnathanalexander.vacationplanner.app.service.VacationConfigItemService;

@Service
@Transactional
public class VacationConfigItemServiceImpl implements VacationConfigItemService {
	
	private final VacationConfigItemRepository repository;
	private final VacationRepository vacationRepository;
	
	public VacationConfigItemServiceImpl(VacationConfigItemRepository repository, VacationRepository vacationRepository) {
		this.repository = repository;
		this.vacationRepository = vacationRepository;
	}

	public VacationDto saveVacationConfigItem(VacationConfigItemDto dto) {
		
		Vacation vacation = vacationRepository.getVacationByConfigItem(dto.id());
		
		VacationConfig vacationConfig = vacation.getVacationConfig();
		
		Set<VacationConfigItem> vacationConfigItems = vacationConfig.getVacationConfigItems();
		
		for(VacationConfigItem item : vacationConfigItems) {
			if(item.getId() == dto.id()) {
				item.setConfigValue(dto.config_value());
				item.setConfig_notes(dto.config_notes());
			}
		}
		
		
		Vacation updatedVacation = vacationRepository.save(vacation);
		

		return VacationMapper.toVacationDto(updatedVacation);
	}

}
