package com.johnathanalexander.vacationplanner.app.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.service.VacationConfigItemService;

@RestController
@RequestMapping("/api/v1/vacationConfigItem")
public class VacationConfigController {
	
	private final VacationConfigItemService service;
	
	@Autowired
	public VacationConfigController(VacationConfigItemService service) {
		this.service = service;
	}
	
	/*TODO: Need to update this for incoming param to be a VacationConfigItemRequestDto and response as VacationConfigItemDto*/
	@PutMapping("/saveVacationConfigItem")
	private ResponseEntity<VacationDto> saveVacationConfigItem(@RequestBody VacationConfigItemDto dto) {
		System.out.println("VACATION CONFIG ITEM ATTEMPTING TO SAVE: " + dto.config_value());
		VacationDto vacationDto = service.saveVacationConfigItem(dto);
		return ResponseEntity.ok(vacationDto);
	}

}
