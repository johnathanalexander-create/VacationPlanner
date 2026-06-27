package com.johnathanalexander.vacationplanner.admin.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnathanalexander.vacationplanner.admin.dto.ReportDto;
import com.johnathanalexander.vacationplanner.admin.service.ReportService;

@RestController
@RequestMapping("/api/v1/admin/stats")
public class AdminController {
	//private final ReportService reportService;
	
	/*public AdminController(ReportService service) {
		this.reportService = service;
	}*/
	@GetMapping()
	public ReportDto getReportByName(String name) {
		return null;
		
	}
}
