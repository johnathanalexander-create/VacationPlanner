package com.angelokezimana.starter.vacationplanner.app.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.angelokezimana.starter.user.repository.UserRepository;
import com.angelokezimana.starter.vacationplanner.app.dto.PrepaymentDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationConfigItemDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationRequestDto;
import com.angelokezimana.starter.vacationplanner.app.exception.VacationNotFoundException;
import com.angelokezimana.starter.vacationplanner.app.mapper.VacationMapper;
import com.angelokezimana.starter.vacationplanner.app.model.Prepayment;
import com.angelokezimana.starter.vacationplanner.app.model.Vacation;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfig;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfigItem;
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
		
		//Vacation updatedVacation = vacationRepository.findById(vacationRequestDto.id());
				//.orElseThrow(() -> Exception.forId(vacationRequestDto.id()));
		//updatedVacation.setId(vacationRequestDto.id());
		updatedVacation.setName(vacationRequestDto.name());
		updatedVacation.setState(vacationRequestDto.state());
		updatedVacation.setOwner(vacationRequestDto.owner());
		updatedVacation.setNotes(vacationRequestDto.notes());
		updatedVacation.setFunding_comps_credits(vacationRequestDto.funding_comps_credits());
		
		Set<Prepayment> prepayments = new HashSet<>();
		List<PrepaymentDto> prepaymentDtoList = new ArrayList<>(vacationRequestDto.prepayments());
		
		for(int ppIndex = 0; ppIndex < prepaymentDtoList.size(); ppIndex++) {
			PrepaymentDto prepaymentDto = prepaymentDtoList.get(ppIndex);
			
			Prepayment newPrepayment = new Prepayment();
			//newPrepayment.setId(prepaymentDto.id());//TODO can probably update this to non conditional
			//newPrepayment.setVacation(updatedVacation);
			newPrepayment.setDescription(prepaymentDto.description());
			newPrepayment.setType(prepaymentDto.type());
			newPrepayment.setVendor(prepaymentDto.vendor());
			newPrepayment.setIs_refundable(prepaymentDto.isRefundable());
			newPrepayment.setIs_refund_requested(prepaymentDto.isRefundRequested());
			newPrepayment.setIs_refund_received(prepaymentDto.isRefundReceived());
			newPrepayment.setAmount(prepaymentDto.amount());
			newPrepayment.setPayment_source(prepaymentDto.paymentSource());
			newPrepayment.setNotes(prepaymentDto.notes());
			prepayments.add(newPrepayment);
		}
		
		updatedVacation.setPrepayments(prepayments);
		
		//VacationConfig config = new VacationConfig();
		//config.setId(vacationRequestDto.config().id());
		
		//List<VacationConfigItem> configItems = new ArrayList<>();
		//List<VacationConfigItemDto> dtoConfigItems = new ArrayList<>(vacationRequestDto.config().configItems());
		
		/*for(var ciIndex = 0; ciIndex < dtoConfigItems.size(); ciIndex++) {
			VacationConfigItemDto dto = dtoConfigItems.get(ciIndex);
			VacationConfigItem configItem = new VacationConfigItem();
			
			//configItem.setId(dto.id());//TODO can probably update this to non conditional
			//configItem.setVacationConfig(config);
			configItem.setConfigKey(dto.config_key());
			configItem.setConfigLabel(dto.config_label());
			configItem.setConfigValue(dto.config_value());
			configItem.setConfig_notes(dto.config_notes());
			configItem.setPrimary_config(dto.primary_config());
			configItem.setRequired(dto.required());
			
			configItems.add(configItem);
		}*/
		
		
		//config.setVacationConfigItems(new HashSet<>(configItems));
		
		//updatedVacation.setVacationConfig(config);
		
		System.out.println("ALL THE IDS");
		System.out.println("VACATION ID: " + updatedVacation.getId());
		System.out.println("VACATION CONFIG ID: " + updatedVacation.getVacationConfig().getId());
		

		Vacation vacation = vacationRepository.save(updatedVacation);
			
		return VacationMapper.toVacationDto(vacation);

	}
	
}
