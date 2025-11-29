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

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationRequestDto;
import com.johnathanalexander.vacationplanner.app.exception.VacationNotFoundException;
import com.johnathanalexander.vacationplanner.app.mapper.VacationMapper;
import com.johnathanalexander.vacationplanner.app.model.Prepayment;
import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.repository.PrepaymentSourceRepository;
import com.johnathanalexander.vacationplanner.app.repository.VacationRepository;
import com.johnathanalexander.vacationplanner.app.service.VacationService;
import com.johnathanalexander.vacationplanner.user.repository.UserRepository;

@Service
@Transactional
public class VacationServiceImpl implements VacationService{
	
	private final VacationRepository vacationRepository;
	private final UserRepository userRepository;
	private final PrepaymentSourceRepository prepaymentSourceRepository;
	
	public VacationServiceImpl(VacationRepository vacationRepository, UserRepository userRepository, PrepaymentSourceRepository prepaymentSourceRepository) {
		this.vacationRepository = vacationRepository;
		this.userRepository = userRepository;
		this.prepaymentSourceRepository = prepaymentSourceRepository;
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

		return map;
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	public VacationDto createVacation(VacationRequestDto vacationRequestDto, String user) {
		
		Vacation vacation = new Vacation();
		vacation.setName(vacationRequestDto.name());
		vacation.setState("Draft");
		vacation.setOwner(userRepository.findUserIDByEmail(user));
		vacation.setVacationConfig(null);
		
				
		Vacation savedVacation = vacationRepository.save(vacation);

		return VacationMapper.toVacationDto(savedVacation);
	}
	
	@TODO("Payment source should be retrieved using a findById from the id sent via the dto. Dto should implement PrepaymentSourceDto instead of the actual entity")
	@PreAuthorize("hasRole('ROLE_USER')")
	public VacationDto updateVacation(VacationRequestDto vacationRequestDto) {
		
		Vacation updatedVacation = vacationRepository.findById(vacationRequestDto.id())
				.orElseThrow(() -> VacationNotFoundException.forId(vacationRequestDto.id()));

		updatedVacation.setName(vacationRequestDto.name());
		updatedVacation.setState(vacationRequestDto.state());
		updatedVacation.setNotes(vacationRequestDto.notes());
		updatedVacation.setFundingCompsCredits(vacationRequestDto.funding_comps_credits());
		
		//Need to update Prepayments; Spas, Budget Items, Config, Confirmations
		
		
		List<PrepaymentDto> prepaymentDtoList = new ArrayList<>(vacationRequestDto.prepayments());//Incoming from UI
		Set<Prepayment> prepayments = new HashSet<>();//What we are converting UI prepayments into
		
		/*List<PrepaymentDto> existingPrepayments = prepaymentDtoList.stream()
													.filter(pp -> pp.id() != 0)
													.collect(Collectors.toList());
		
		List<PrepaymentDto> newPrepayments = prepaymentDtoList.stream()
												.filter(pp -> pp.id() == 0)
												.collect(Collectors.toList());*/
		
		/*for(PrepaymentDto ppDto : existingPrepayments) {
			Prepayment existingPrepayment = updatedVacation.getPrepayments().stream()
												.filter(prepayment -> prepayment.getId() == ppDto.id())
												.findFirst()
												.orElse(null)
		}*/
		
		for(PrepaymentDto dto : prepaymentDtoList) {
			Prepayment prepayment = updatedVacation.getPrepayments().stream()
										.filter(pp -> pp.getId() == dto.id())
										.findFirst()
										.orElseGet(() ->{
											return new Prepayment();
										});
			//implement this
			//PrepaymentSource paymentSource = prepaymentSourceRepository.findById(dto.payment)
			
			prepayment.setDescription(dto.description());
			prepayment.setType(dto.type());
			prepayment.setVendor(dto.vendor());
			prepayment.setIsRefundable(dto.isRefundable());
			prepayment.setIsRefundRequested(dto.isRefundRequested());
			prepayment.setIsRefundReceived(dto.isRefundReceived());
			prepayment.setAmount(dto.amount());
			prepayment.setPaymentSource(dto.paymentSource());//Update this
			prepayment.setNotes(dto.notes());
			
			if(prepayment.getVacation() == null) {
				prepayment.setVacation(updatedVacation);
			}
			
			prepayments.add(prepayment);
			
			
		}
		
		updatedVacation.setPrepayments(prepayments);
		
		
		
		
		
		
		
		
		
		
		//Set<Prepayment> prepayments = new HashSet<>();
		//List<PrepaymentDto> prepaymentDtoList = new ArrayList<>(vacationRequestDto.prepayments());

		/*for(int ppIndex = 0; ppIndex < prepaymentDtoList.size(); ppIndex++) {
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
		}*/

		//updatedVacation.setPrepayments(prepayments);		

		Vacation vacation = vacationRepository.save(updatedVacation);
		return VacationMapper.toVacationDto(vacation);

	}
	
	/*public VacationDto setFCC(Long id, String fcc) {
		Vacation updatedVacation = vacationRepository.findById(id)
				.orElseThrow(() -> VacationNotFoundException.forId(id));
		
		updatedVacation.setFundingCompsCredits(fcc);
		
		Vacation response = vacationRepository.save(updatedVacation);
		
		return VacationMapper.toVacationDto(response);
	}
	
	public VacationDto cancel(Long id) {
		Vacation vacationToCancel = vacationRepository.findById(id)
				.orElseThrow(() -> VacationNotFoundException.forId(id));
		
		vacationToCancel.setState("Cancelled");
		
		Vacation response = vacationRepository.save(vacationToCancel);
		
		return VacationMapper.toVacationDto(response);
	}*/
}
