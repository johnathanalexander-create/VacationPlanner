package com.angelokezimana.starter.vacationplanner.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.angelokezimana.starter.vacationplanner.app.model.Prepayment;
import com.angelokezimana.starter.vacationplanner.app.model.Vacation;

public interface PrepaymentRepository extends JpaRepository<Prepayment, Long>{
	
	@Query("Select p From Prepayment p join Vacation v on p.vacation_id.id=v.id WHERE p.vacation_id=:vacationId")
	List<Prepayment> getAllPrepaymentsForAVacation(@Param("vacationId") String vacationId);
}
