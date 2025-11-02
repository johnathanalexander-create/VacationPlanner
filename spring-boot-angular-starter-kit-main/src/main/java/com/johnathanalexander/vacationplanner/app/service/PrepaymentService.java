package com.johnathanalexander.vacationplanner.app.service;

import java.util.List;
import java.util.Set;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;

public interface PrepaymentService {
	List<PrepaymentSourceDto> getAllPrepaymentSources();
}
