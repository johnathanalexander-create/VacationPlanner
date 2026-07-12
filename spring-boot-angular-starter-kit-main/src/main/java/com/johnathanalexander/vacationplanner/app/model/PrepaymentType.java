package com.johnathanalexander.vacationplanner.app.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name="prepayment_type")
public class PrepaymentType {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column()
	private boolean active;
	
	@Column(length=25, nullable=false)
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
