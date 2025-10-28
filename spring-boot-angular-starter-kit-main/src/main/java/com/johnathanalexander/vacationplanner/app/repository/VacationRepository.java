package com.johnathanalexander.vacationplanner.app.repository;

import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.user.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VacationRepository extends JpaRepository<Vacation, Long>{
	@Query("SELECT v FROM Vacation v JOIN User u ON v.owner=u.id WHERE v.owner=:owner_id")
	List<Vacation> getAllVacationsByOwner(@Param("owner_id") Long owner_id);
}
