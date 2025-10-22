package com.angelokezimana.starter.vacationplanner.app.model;

import jakarta.persistence.*;

@Entity
@Table(name="vacation_config_item")
public class VacationConfigItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_config_id", nullable=false)
	private VacationConfig vacationConfig;
	
	@Column(length = 50, nullable=false)
	private String config_name;
	
	@Column(length = 100)
	private String config_value;
	
	@Column(length = 50)
	private String config_notes;
	
	@Column()
	private boolean primary_config;
	
	@Column()
	private boolean required;
	
	
	@Override
	public String toString() {
		return "CONFIG ITEM: " + id + "/" + config_name + "/" + config_value + "/" + config_notes + "/" + primary_config + "/" + required;
	}
	
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public VacationConfig getVacationConfig() {
		return vacationConfig;
	}


	public void setVacationConfig(VacationConfig vacationConfig) {
		this.vacationConfig = vacationConfig;
	}


	public String getConfig_name() {
		return config_name;
	}


	public void setConfig_name(String config_name) {
		this.config_name = config_name;
	}


	public String getConfig_value() {
		return config_value;
	}


	public void setConfig_value(String config_value) {
		this.config_value = config_value;
	}


	public String getConfig_notes() {
		return config_notes;
	}


	public void setConfig_notes(String config_notes) {
		this.config_notes = config_notes;
	}


	public boolean isPrimary_config() {
		return primary_config;
	}


	public void setPrimary_config(boolean primary_config) {
		this.primary_config = primary_config;
	}


	public boolean isRequired() {
		return required;
	}


	public void setRequired(boolean required) {
		this.required = required;
	}
}
