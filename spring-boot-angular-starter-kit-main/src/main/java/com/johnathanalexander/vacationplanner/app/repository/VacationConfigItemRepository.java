package com.johnathanalexander.vacationplanner.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;

public interface VacationConfigItemRepository extends JpaRepository<VacationConfigItem, Long>{

}
