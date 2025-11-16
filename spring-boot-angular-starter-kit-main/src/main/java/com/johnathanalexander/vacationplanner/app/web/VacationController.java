package com.johnathanalexander.vacationplanner.app.web;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.app.dto.ConfirmationDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationRequestDto;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.service.VacationService;
import com.johnathanalexander.vacationplanner.user.dto.UserDto;
import com.johnathanalexander.vacationplanner.user.dto.UserRequestDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/vacation")
public class VacationController {

	private final VacationService vacationService;
	
	@Autowired
	public VacationController(VacationService vacationService) {
		this.vacationService = vacationService;
	}
	
	@PostMapping()
    private ResponseEntity<VacationDto> create(@RequestBody @Valid VacationRequestDto vacationRequestDTO, Principal principal) {
        VacationDto vacationDTO = vacationService.createVacation(vacationRequestDTO, principal.getName());
        return ResponseEntity.ok(vacationDTO);
    }
	
	@GetMapping("/list/{id}")
	private ResponseEntity<List<Map<String, Object>>> getListOfVacationsByOwnerID(@PathVariable("id") Long id){
		List<Map<String, Object>> vacationMap = vacationService.getVacationListByOwner(id);

		return ResponseEntity.ok(vacationMap);
	}
	
	@GetMapping("/getVacation/{id}")
	private ResponseEntity<VacationDto> findVacationById(@PathVariable("id") Long id){
		VacationDto dto = vacationService.getVacationById(id);
		
		return ResponseEntity.ok(dto);
	}
	
	
	@GetMapping("/{id}")
	private ResponseEntity<List<VacationDto>> findAll(@PathVariable("id") Long id){
		List<VacationDto> list = vacationService.getAllVacationsByOwner(id);

		return ResponseEntity.ok(list);
	}
	
	@PutMapping()
	private ResponseEntity<VacationDto> updateVacation(@RequestBody VacationRequestDto vacation){
		VacationDto dto = vacationService.updateVacation(vacation);
		
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/setFCC/{id}")
	private ResponseEntity<VacationDto> updateFCC(@PathVariable("id") Long id, @RequestBody String fccString){		
		VacationDto dto = vacationService.setFCC(id, fccString);
		
		return ResponseEntity.ok(dto);
	}
	
}
