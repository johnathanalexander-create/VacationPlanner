package com.johnathanalexander.vacationplanner.common.utility;

import java.util.Set;

import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;

public class VacationConfigItemUtility {
	
	public static String getVCIValue(VacationConfig vc, String search) {
		Set<VacationConfigItem> vciList = vc.getVacationConfigItems();
		
		VacationConfigItem searchResult = vciList.stream()
			.filter(vci -> vci.getConfigKey().equals(search))
			.findFirst()
			.orElseGet(() -> {
				return new VacationConfigItem();
			});
		
		return searchResult.getConfigValue();
	}
}
