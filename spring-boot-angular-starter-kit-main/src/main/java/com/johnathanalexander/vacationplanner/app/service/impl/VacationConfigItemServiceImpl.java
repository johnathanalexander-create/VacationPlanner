package com.johnathanalexander.vacationplanner.app.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.exception.VacationConfigItemNotFoundException;
import com.johnathanalexander.vacationplanner.app.exception.VacationNotFoundException;
import com.johnathanalexander.vacationplanner.app.mapper.VacationMapper;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.repository.VacationConfigItemRepository;
import com.johnathanalexander.vacationplanner.app.repository.VacationRepository;
import com.johnathanalexander.vacationplanner.app.service.VacationConfigItemService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
@Transactional
public class VacationConfigItemServiceImpl implements VacationConfigItemService {
	
	private final VacationConfigItemRepository repository;
	private final VacationRepository vacationRepository;
	
	//@PersistenceContext
	private EntityManager entityManager;
	
	public VacationConfigItemServiceImpl(VacationConfigItemRepository repository, VacationRepository vacationRepository, EntityManager entityManager) {
		this.repository = repository;
		this.vacationRepository = vacationRepository;
		this.entityManager = entityManager;
	}

	@PreAuthorize("hasRole('ROLE_USER')")
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
		
		
		Vacation updatedVacation = vacationRepository.saveAndFlush(vacation);
		entityManager.refresh(updatedVacation);
		

		return VacationMapper.toVacationDto(updatedVacation);
	}

}
