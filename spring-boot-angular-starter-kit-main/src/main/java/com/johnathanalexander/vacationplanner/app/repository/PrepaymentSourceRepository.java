package com.johnathanalexander.vacationplanner.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;

public interface PrepaymentSourceRepository extends JpaRepository<PrepaymentSource, Long>{

}
