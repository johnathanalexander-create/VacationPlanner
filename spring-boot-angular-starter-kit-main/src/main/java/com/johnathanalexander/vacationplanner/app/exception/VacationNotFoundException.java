package com.johnathanalexander.vacationplanner.app.exception;

import com.johnathanalexander.vacationplanner.admin.exception.RoleNotFoundException;

import jakarta.persistence.EntityNotFoundException;

public class VacationNotFoundException extends EntityNotFoundException{
	public VacationNotFoundException(String message) {
        super(message);
    }

    public static RoleNotFoundException forId(Long roleId) {
        return new RoleNotFoundException("Role with " + roleId + " not found");
    }
}
