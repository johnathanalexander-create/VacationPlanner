package com.angelokezimana.starter.vacationplanner.app.repository;

import com.angelokezimana.starter.user.model.User;
import com.angelokezimana.starter.vacationplanner.app.dto.VacationDto;
import com.angelokezimana.starter.vacationplanner.app.model.Vacation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VacationRepository extends JpaRepository<Vacation, Long>{
	@Query("SELECT v FROM Vacation v JOIN User u ON v.owner=u.id WHERE v.owner=:owner_id")
	List<Vacation> getAllVacationsByOwner(@Param("owner_id") Long owner_id);
}
