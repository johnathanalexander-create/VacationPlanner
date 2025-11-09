package com.johnathanalexander.vacationplanner.app.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.exception.VacationConfigItemNotFoundException;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.repository.VacationConfigItemRepository;
import com.johnathanalexander.vacationplanner.app.service.VacationConfigItemService;

@Service
@Transactional
public class VacationConfigItemServiceImpl implements VacationConfigItemService {
	
	private final VacationConfigItemRepository repository;
	
	public VacationConfigItemServiceImpl(VacationConfigItemRepository repository) {
		this.repository = repository;
	}

	public void saveVacationConfigItem(VacationConfigItemDto dto) {
		VacationConfigItem item = repository.findById(dto.id())
				.orElseThrow(()-> VacationConfigItemNotFoundException.forId(dto.id()));
		
		System.out.println("JWSA: " + item.getConfigKey());
		
		item.setConfig_notes(dto.config_notes());
		item.setConfigValue(dto.config_value());
		
		
		repository.save(item);
	}

}
