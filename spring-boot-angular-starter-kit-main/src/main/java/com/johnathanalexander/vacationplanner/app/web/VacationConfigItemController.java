package com.johnathanalexander.vacationplanner.app.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.service.VacationConfigItemService;

@RestController
@RequestMapping("/api/v1/vacationConfigItem")
public class VacationConfigItemController {
	
	private final VacationConfigItemService service;
	
	@Autowired
	public VacationConfigItemController(VacationConfigItemService service) {
		this.service = service;
	}
	
	@PutMapping("/saveVacationConfigItem")
	private ResponseEntity saveVacationConfigItem(@RequestBody VacationConfigItemDto dto) {
		service.saveVacationConfigItem(dto);
		return ResponseEntity.ok(null);
	}

}
