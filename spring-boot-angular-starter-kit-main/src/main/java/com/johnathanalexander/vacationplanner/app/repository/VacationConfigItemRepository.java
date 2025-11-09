package com.johnathanalexander.vacationplanner.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;

public interface VacationConfigItemRepository extends JpaRepository<VacationConfigItem, Long>{

}
