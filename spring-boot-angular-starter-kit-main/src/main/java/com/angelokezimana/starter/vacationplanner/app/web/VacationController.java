package com.angelokezimana.starter.vacationplanner.app.web;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
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

import com.angelokezimana.starter.user.dto.UserDto;
import com.angelokezimana.starter.user.dto.UserRequestDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationConfigItemDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationDto;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationRequestDto;
import com.angelokezimana.starter.vacationplanner.app.model.VacationConfigItem;
import com.angelokezimana.starter.vacationplanner.app.service.VacationService;

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
	
	@GetMapping("/{id}")
	private ResponseEntity<List<VacationDto>> findAll(@PathVariable("id") Long id){
		List<VacationDto> list = vacationService.getAllVacationsByOwner(id);
		for(int count = 0; count < list.size(); count++) {
			VacationDto d = list.get(count);
			System.out.println(d.id() + " / " + d.name() + " / " + d.state() + " / " + d.owner());
			System.out.println(d.config().id());
			//Set<VacationConfigItem> items = d.config().getVacationConfigItems();
			Set<VacationConfigItemDto> items = d.config().configItems();
			for(VacationConfigItemDto i : items) {
				System.out.println(i.config_label());
			}
		}
		return ResponseEntity.ok(list);
	}
	
	@PutMapping()
	private ResponseEntity<VacationDto> updateVacation(@RequestBody VacationRequestDto vacation){
		VacationDto dto = vacationService.updateVacation(vacation);
		
		return ResponseEntity.ok(dto);
	}
}
