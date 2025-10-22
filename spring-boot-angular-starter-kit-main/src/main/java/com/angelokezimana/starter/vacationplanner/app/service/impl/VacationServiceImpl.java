package com.angelokezimana.starter.vacationplanner.app.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angelokezimana.starter.user.repository.UserRepository;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationRequestDto;
import com.angelokezimana.starter.vacationplanner.app.mapper.VacationMapper;
import com.angelokezimana.starter.vacationplanner.app.model.Vacation;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfig;
import com.angelokezimana.starter.vacationplanner.app.repository.VacationRepository;
import com.angelokezimana.starter.vacationplanner.app.service.VacationService;

@Service
@Transactional
public class VacationServiceImpl implements VacationService{
	
	private final VacationRepository vacationRepository;
	private final UserRepository userRepository;
	
	public VacationServiceImpl(VacationRepository vacationRepository, UserRepository userRepository) {
		this.vacationRepository = vacationRepository;
		this.userRepository = userRepository;
	}

	public List<VacationDto> getAllVacationsByOwner(Long id) {
		List<Vacation> vacationList = vacationRepository.getAllVacationsByOwner(id);
		
		
		
		System.out.println(vacationList.get(0).toString());
		return vacationList.stream().map(vacation -> {
			return VacationMapper.toVacationDto(vacation);
		}).collect(Collectors.toList());
	}

	@PreAuthorize("hasPermission('USER', 'CREATE')")
	public VacationDto createVacation(VacationRequestDto vacationRequestDto, String user) {
		
		Vacation vacation = new Vacation();
		//vacation.setName(vacationRequestDto.name());
		//vacation.setState("Draft");
		//vacation.setOwner(userRepository.findUserIDByEmail(user));
				
		Vacation savedVacation = vacationRepository.save(vacation);

		return VacationMapper.toVacationDto(savedVacation);
	}
	
}
