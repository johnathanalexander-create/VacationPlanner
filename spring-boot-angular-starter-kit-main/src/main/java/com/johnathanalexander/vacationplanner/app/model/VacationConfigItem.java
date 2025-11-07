package com.johnathanalexander.vacationplanner.app.model;

import jakarta.persistence.*;

@Entity
@Table(name="vacation_config_item")
public class VacationConfigItem {

	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_config_id", nullable=true)
	private VacationConfig vacationConfig;
	
	@Column(length = 50, nullable=false)
	private String config_key;
	
	@Column(length = 50, nullable=false)
	private String config_label;
	
	@Column(length = 100)
	private String config_value;
	
	@Column(length = 50)
	private String config_notes;
	
	@Column()
	private boolean primary_config;
	
	@Column()
	private boolean required;
	
	@Column()
	private byte order;
	
	
	@Override
	public String toString() {
		return "CONFIG ITEM: " + id + "/" + config_label + "/" + config_value + "/" + config_notes + "/" + primary_config + "/" + required;
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


	public String getConfigLabel() {
		return config_label;
	}


	public void setConfigLabel(String config_name) {
		this.config_label = config_name;
	}


	public String getConfigValue() {
		return config_value;
	}


	public void setConfigValue(String config_value) {
		this.config_value = config_value;
	}


	public String getConfig_notes() {
		return config_notes;
	}


	public String getConfigKey() {
		return config_key;
	}


	public void setConfigKey(String config_key) {
		this.config_key = config_key;
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


	public byte getOrder() {
		return order;
	}


	public void setOrder(byte order) {
		this.order = order;
	}
}
