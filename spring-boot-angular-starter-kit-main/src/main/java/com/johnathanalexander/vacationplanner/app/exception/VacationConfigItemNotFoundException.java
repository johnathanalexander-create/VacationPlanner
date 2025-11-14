package com.johnathanalexander.vacationplanner.app.exception;

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.admin.exception.RoleNotFoundException;

import jakarta.persistence.EntityNotFoundException;

public class VacationConfigItemNotFoundException extends EntityNotFoundException{
	public VacationConfigItemNotFoundException(String message) {
		super(message);
	}
	
	@TODO("Update this so that it does not use RoleNotFoundException")
	public static RoleNotFoundException forId(Long id) {
		return new RoleNotFoundException("VacationConfigItem with id " + id + " not found.");
	}
}
