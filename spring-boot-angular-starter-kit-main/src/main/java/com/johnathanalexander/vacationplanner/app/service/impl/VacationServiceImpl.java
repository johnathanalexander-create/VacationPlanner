package com.johnathanalexander.vacationplanner.app.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationRequestDto;
import com.johnathanalexander.vacationplanner.app.exception.VacationNotFoundException;
import com.johnathanalexander.vacationplanner.app.mapper.VacationMapper;
import com.johnathanalexander.vacationplanner.app.model.Prepayment;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.repository.VacationRepository;
import com.johnathanalexander.vacationplanner.app.service.VacationService;
import com.johnathanalexander.vacationplanner.user.repository.UserRepository;

@Service
@Transactional
public class VacationServiceImpl implements VacationService{
	
	private final VacationRepository vacationRepository;
	private final UserRepository userRepository;
	
	public VacationServiceImpl(VacationRepository vacationRepository, UserRepository userRepository) {
		this.vacationRepository = vacationRepository;
		this.userRepository = userRepository;
	}
	
	public VacationDto getVacationById(Long id) {
		Optional<Vacation> vacation = vacationRepository.findById(id);
		
		return VacationMapper.toVacationDto(vacation.get());
	}

	public List<VacationDto> getAllVacationsByOwner(Long id) {
		List<Vacation> vacationList = vacationRepository.getAllVacationsByOwner(id);
		
		return vacationList.stream().map(vacation -> {
			return VacationMapper.toVacationDto(vacation);
		}).collect(Collectors.toList());
	}
	
	public List<Map<String, Object>> getVacationListByOwner(Long id){
		List<Map<String, Object>> map =  vacationRepository.getVacationListByOwner(id);
		System.out.println(map.toString());
		return map;
	}

	//@PreAuthorize("hasPermission('USER', 'CREATE')")
	public VacationDto createVacation(VacationRequestDto vacationRequestDto, String user) {
		
		Vacation vacation = new Vacation();
		vacation.setName(vacationRequestDto.name());
		vacation.setState("Draft");
		vacation.setOwner(userRepository.findUserIDByEmail(user));
		vacation.setVacationConfig(null);
		
				
		Vacation savedVacation = vacationRepository.save(vacation);

		return VacationMapper.toVacationDto(savedVacation);
	}
	
	public VacationDto updateVacation(VacationRequestDto vacationRequestDto) {
		
		Vacation updatedVacation = vacationRepository.findById(vacationRequestDto.id())
				.orElseThrow(() -> VacationNotFoundException.forId(vacationRequestDto.id()));
		
		updatedVacation.setName(vacationRequestDto.name());
		updatedVacation.setState(vacationRequestDto.state());
		updatedVacation.setOwner(vacationRequestDto.owner());
		updatedVacation.setNotes(vacationRequestDto.notes());
		updatedVacation.setFundingCompsCredits(vacationRequestDto.funding_comps_credits());
		//updatedVacation.setFunding_comps_credits(vacationRequestDto.funding_comps_credits().toString());
		
		Set<Prepayment> prepayments = new HashSet<>();
		List<PrepaymentDto> prepaymentDtoList = new ArrayList<>(vacationRequestDto.prepayments());
		
		for(int ppIndex = 0; ppIndex < prepaymentDtoList.size(); ppIndex++) {
			PrepaymentDto prepaymentDto = prepaymentDtoList.get(ppIndex);
			
			Prepayment newPrepayment = new Prepayment();
			newPrepayment.setDescription(prepaymentDto.description());
			newPrepayment.setType(prepaymentDto.type());
			newPrepayment.setVendor(prepaymentDto.vendor());
			newPrepayment.setIsRefundable(prepaymentDto.isRefundable());
			newPrepayment.setIsRefundRequested(prepaymentDto.isRefundRequested());
			newPrepayment.setIsRefundReceived(prepaymentDto.isRefundReceived());
			newPrepayment.setAmount(prepaymentDto.amount());
			newPrepayment.setPaymentSource(prepaymentDto.paymentSource());
			newPrepayment.setNotes(prepaymentDto.notes());
			prepayments.add(newPrepayment);
		}
		
		updatedVacation.setPrepayments(prepayments);		

		Vacation vacation = vacationRepository.save(updatedVacation);
			
		return VacationMapper.toVacationDto(vacation);

	}
	
}
