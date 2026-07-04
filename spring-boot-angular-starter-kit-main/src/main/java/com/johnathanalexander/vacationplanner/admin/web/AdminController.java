package com.johnathanalexander.vacationplanner.admin.web;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.admin.dto.ReportDto;
import com.johnathanalexander.vacationplanner.admin.service.ReportService;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;
import com.johnathanalexander.vacationplanner.app.service.PrepaymentService;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
	
	private PrepaymentService prepaymentService;
	
	public AdminController(PrepaymentService prepaymentService) {
		this.prepaymentService = prepaymentService;
	}
	
	
	@PostMapping("prepayments/manage/sources/update")
	public ResponseEntity<Set<PrepaymentSourceDto>> updateOrCreatePrepaymentSource(@RequestBody PrepaymentSourceDto dto){
		return ResponseEntity.ok(this.prepaymentService.updateOrCreatePrepaymentSource(dto));
	}
	
	@DeleteMapping("prepayments/manage/sources/delete/{id}")
	public ResponseEntity<List<PrepaymentSourceDto>> deletePaymentSource(Long id){
		return ResponseEntity.ok(this.prepaymentService.deletePrepaymentSource(id));
	}
}
