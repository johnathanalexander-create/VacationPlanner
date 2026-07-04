package com.johnathanalexander.vacationplanner.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;

public interface PrepaymentSourceRepository extends JpaRepository<PrepaymentSource, Long>{
	@Query("Select s from PrepaymentSource s")
	List<PrepaymentSource> getAllPrepaymentSources();
	
	@Query("Select s from PrepaymentSource s where active=true")
	List<PrepaymentSource> getAllActivePrepaymentSources();
}
