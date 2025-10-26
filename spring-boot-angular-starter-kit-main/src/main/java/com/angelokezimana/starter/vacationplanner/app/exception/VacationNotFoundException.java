package com.angelokezimana.starter.vacationplanner.app.exception;

import com.angelokezimana.starter.admin.exception.RoleNotFoundException;

import jakarta.persistence.EntityNotFoundException;

public class VacationNotFoundException extends EntityNotFoundException{
	public VacationNotFoundException(String message) {
        super(message);
    }

    public static RoleNotFoundException forId(Long roleId) {
        return new RoleNotFoundException("Role with " + roleId + " not found");
    }
}
