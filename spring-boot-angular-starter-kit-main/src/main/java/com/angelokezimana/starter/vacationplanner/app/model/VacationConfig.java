package com.angelokezimana.starter.vacationplanner.app.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name="vacation_config")
public class VacationConfig {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="vacation_id", referencedColumnName="id")
	private Vacation vacation;
	
	@OneToMany(mappedBy="vacationConfig", fetch=FetchType.LAZY)
	private Set<VacationConfigItem> vacationConfigItems = new HashSet<>();

	/*public Vacation getVacation() {
		return vacation;
	}

	public void setVacation(Vacation vacation) {
		this.vacation = vacation;
	}*/

	public Set<VacationConfigItem> getVacationConfigItems() {
		return vacationConfigItems;
	}

	public void setVacationConfigItems(Set<VacationConfigItem> vacationConfigItems) {
		this.vacationConfigItems = vacationConfigItems;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	/*@Override
	public String toString() {
		String ret = "";
		
		java.util.List<VacationConfigItem> list = new java.util.ArrayList<>(this.vacationConfigItems);
		
		for(int c = 0; c < list.size(); c++) {
			VacationConfigItem i = list.get(c);
			ret += i.toString() + "\n";
		}
		
		return ret;
		
		
	}*/
	
}
