package com.johnathanalexander.vacationplanner.app.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentRequestDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;
import com.johnathanalexander.vacationplanner.app.service.PrepaymentService;

@RestController
@RequestMapping("/api/v1/prepayment")
public class PrepaymentController {
	private final PrepaymentService prepaymentService;
	
	@Autowired
	public PrepaymentController(PrepaymentService service) {
		this.prepaymentService = service;
	}
	
	@GetMapping("/getPrepaymentSources")
	private ResponseEntity<List<PrepaymentSourceDto>> getAllPrepaymentSources(){System.out.println("jwsa working");
		
		List<PrepaymentSourceDto> dto = prepaymentService.getAllPrepaymentSources();
		System.out.println(dto.get(0).name());
		
		return ResponseEntity.ok(dto);
		
	}
	
	@PostMapping()
	private ResponseEntity<PrepaymentDto> createPrepayment(@RequestBody PrepaymentRequestDto dto){
		
		return ResponseEntity.ok(null);
	}
}
