package com.johnathanalexander.vacationplanner.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;

public interface VacationConfigItemRepository extends JpaRepository<VacationConfigItem, Long>{

	/*@Query("SELECT v FROM VacationConfigItem vci JOIN VacationConfig vc JOIN Vacation v ON vci.vacationConfig.id=vc.id AND vc.vacation.id=v.id WHERE vci.id=:config_item_id")
	Vacation getVacationByConfigItem(@Param("config_item_id") Long configItemId);*/
}
