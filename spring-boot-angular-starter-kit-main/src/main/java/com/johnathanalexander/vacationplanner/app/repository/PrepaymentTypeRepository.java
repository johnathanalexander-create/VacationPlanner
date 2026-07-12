package com.johnathanalexander.vacationplanner.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.johnathanalexander.vacationplanner.app.model.PrepaymentType;

public interface PrepaymentTypeRepository extends JpaRepository<PrepaymentType, Long>{

}
