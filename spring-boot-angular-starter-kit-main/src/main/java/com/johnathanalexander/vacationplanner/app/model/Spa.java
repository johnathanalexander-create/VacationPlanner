package com.johnathanalexander.vacationplanner.app.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="spa")
public class Spa {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	private Vacation vacation;
	
	@Column(length=75, nullable = false)
	private String description;
	
	@Column(length=100, nullable = false)
	private String location;
	
	@Column(length=10, nullable=false)
	private String treatment_date;
	
	@Column(length=10)
	private String treatment_time;
	
	@Column()
	private BigDecimal price;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Vacation getVacation() {
		return vacation;
	}

	public void setVacation(Vacation vacation) {
		this.vacation = vacation;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getTreatmentDate() {
		return treatment_date;
	}

	public void setTreatmentDate(String treatment_date) {
		this.treatment_date = treatment_date;
	}

	public String getTreatmentTime() {
		return treatment_time;
	}

	public void setTreatmentTime(String treatment_time) {
		this.treatment_time = treatment_time;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
}
