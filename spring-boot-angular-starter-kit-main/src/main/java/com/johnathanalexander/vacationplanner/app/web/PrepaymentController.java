package com.johnathanalexander.vacationplanner.app.web;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentRequestDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentTypeDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.service.PrepaymentService;

@RestController
@RequestMapping("/api/v1/prepayment")
public class PrepaymentController {
	private final PrepaymentService prepaymentService;
	
	@Autowired
	public PrepaymentController(PrepaymentService service) {
		this.prepaymentService = service;
	}
	
	@GetMapping("/getActivePrepaymentSources")
	private ResponseEntity<List<PrepaymentSourceDto>> getAllActivePrepaymentSources(){
		
		List<PrepaymentSourceDto> dto = prepaymentService.getAllActivePrepaymentSources();
		
		return ResponseEntity.ok(dto);
		
	}
	@GetMapping("/getAllPrepaymentSources")
	private ResponseEntity<List<PrepaymentSourceDto>> getAllPrepaymentSources(){
		
		List<PrepaymentSourceDto> dto = prepaymentService.getAllPrepaymentSources();
		
		return ResponseEntity.ok(dto);
		
	}
	
	@GetMapping("/getAllPrepaymentTypes")
	private ResponseEntity<List<PrepaymentTypeDto>> getAllPrepaymentTypes(){
		
		List<PrepaymentTypeDto> dto = prepaymentService.getAllPrepaymentTypes();
		
		return ResponseEntity.ok(dto);
		
	}
	
	@PostMapping()
	private ResponseEntity<VacationDto> createPrepayment(@RequestBody PrepaymentRequestDto dto){
		return ResponseEntity.ok(prepaymentService.savePrepayment(dto));
	}
	
	/*@DeleteMapping("/deletePrepaymentSource/{id}")
	private ResponseEntity<List<PrepaymentSourceDto>> deletePrepaymentSource(@PathVariable("id") Long id){
		return ResponseEntity.ok(prepaymentService.deletePrepaymentSource(id));
	}*/
}
