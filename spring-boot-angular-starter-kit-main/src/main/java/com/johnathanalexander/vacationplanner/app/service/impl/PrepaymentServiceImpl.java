package com.johnathanalexander.vacationplanner.app.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;
import com.johnathanalexander.vacationplanner.app.mapper.PrepaymentMapper;
import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;
import com.johnathanalexander.vacationplanner.app.repository.PrepaymentRepository;
import com.johnathanalexander.vacationplanner.app.service.PrepaymentService;

@Service
@Transactional
public class PrepaymentServiceImpl implements PrepaymentService{
	private PrepaymentRepository repository;
	
	public PrepaymentServiceImpl(PrepaymentRepository repo) {
		this.repository = repo;
	}
	
	
	public List<PrepaymentSourceDto> getAllPrepaymentSources(){
		List<PrepaymentSource> prepaymentSources = repository.getAllActivePrepaymentSources();
		
		return prepaymentSources.stream().map(prepaymentSource -> {
			return PrepaymentMapper.toPrepaymentSourceDTO(prepaymentSource);
		}).collect(Collectors.toList());
	}
}
