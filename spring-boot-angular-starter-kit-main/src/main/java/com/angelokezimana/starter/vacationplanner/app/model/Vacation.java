package com.angelokezimana.starter.vacationplanner.app.model;

import java.util.HashSet;
import java.util.Set;

import com.angelokezimana.starter.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name="vacation")
public class Vacation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 250, name="name", nullable = false)
	private String name;
	
	@Column(length = 25, name="state", nullable = false)
	private String state;
	
	@Column(name="owner")
	private Long owner;
	
	@OneToMany(mappedBy="vacation_id", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<Prepayment> prepayments = new HashSet<>();

	public Set<Prepayment> getPrepayments() {
		return prepayments;
	}

	public void setPrepayments(Set<Prepayment> prepayments) {
		this.prepayments = prepayments;
	}

	@OneToOne(mappedBy="vacation", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private VacationConfig vacationConfigify;

	public VacationConfig getVacationConfig() {
		return vacationConfigify;
	}

	public void setVacationConfig(VacationConfig vacationConfig) {
		this.vacationConfigify = vacationConfig;
	}
	
	@Override
	public String toString() {
		return id + "/" + name + "/" + state + "/" + owner + "/" + this.vacationConfigify.toString();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	public Long getOwner() {
		return owner;
	}

	public void setOwner(Long owner) {
		this.owner = owner;
	}	
}
