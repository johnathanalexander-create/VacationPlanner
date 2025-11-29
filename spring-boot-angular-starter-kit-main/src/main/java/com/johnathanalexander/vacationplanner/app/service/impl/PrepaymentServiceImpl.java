package com.johnathanalexander.vacationplanner.app.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentRequestDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.exception.VacationNotFoundException;
import com.johnathanalexander.vacationplanner.app.mapper.PrepaymentMapper;
import com.johnathanalexander.vacationplanner.app.mapper.VacationMapper;
import com.johnathanalexander.vacationplanner.app.model.Prepayment;
import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.repository.PrepaymentRepository;
import com.johnathanalexander.vacationplanner.app.repository.PrepaymentSourceRepository;
import com.johnathanalexander.vacationplanner.app.repository.VacationRepository;
import com.johnathanalexander.vacationplanner.app.service.PrepaymentService;

@Service
@Transactional
public class PrepaymentServiceImpl implements PrepaymentService{
	private PrepaymentRepository repository;
	private PrepaymentSourceRepository prepaymentSourceRepository;
	private VacationRepository vacationRepository;
	
	public PrepaymentServiceImpl(PrepaymentRepository repo, VacationRepository vacationRepository, PrepaymentSourceRepository prepaymentSourceRepository) {
		this.repository = repo;
		this.vacationRepository = vacationRepository;
		this.prepaymentSourceRepository = prepaymentSourceRepository;
	}
	
	
	public List<PrepaymentSourceDto> getAllPrepaymentSources(){
		List<PrepaymentSource> prepaymentSources = repository.getAllActivePrepaymentSources();
		
		return prepaymentSources.stream().map(prepaymentSource -> {
			return PrepaymentMapper.toPrepaymentSourceDTO(prepaymentSource);
		}).collect(Collectors.toList());
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	public VacationDto savePrepayment(PrepaymentRequestDto dto) {
		
		Vacation vacation = vacationRepository.findById(dto.vacation_id())
				.orElseThrow(()-> VacationNotFoundException.forId(dto.vacation_id()));
		
		PrepaymentSource paymentSource = prepaymentSourceRepository.findById(dto.paymentSource().id())
				.orElseThrow(()-> VacationNotFoundException.forId(dto.paymentSource().id()));
		
		
		Prepayment prepayment = new Prepayment();
		prepayment.setDescription(dto.description());
		prepayment.setType(dto.type());
		prepayment.setVendor(dto.vendor());
		prepayment.setAmount(dto.amount());
		prepayment.setPaymentSource(paymentSource);
		prepayment.setVacation(vacation);
		prepayment.setIsRefundable(dto.isRefundable());
		
		Prepayment savedPrepayment = repository.save(prepayment);
		
		//return PrepaymentMapper.toPrepaymentDTO(savedPrepayment);
		
		Vacation response = vacationRepository.findById(dto.vacation_id())
				.orElseThrow(()-> VacationNotFoundException.forId(dto.vacation_id()));
		
		return VacationMapper.toVacationDto(response);
	}
}
