package com.johnathanalexander.vacationplanner.app.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name="fcc")
public class FCC {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_id")
	private Vacation vacation;
	
	@Column(length=50)
	private String fcc_title;
	
	@Column()
	private BigDecimal fcc_amount;

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

	public String getFCCTitle() {
		return fcc_title;
	}

	public void setFCCTitle(String fcc_title) {
		this.fcc_title = fcc_title;
	}

	public BigDecimal getFCCAmount() {
		return fcc_amount;
	}

	public void setFCCAmount(BigDecimal fcc_amount) {
		this.fcc_amount = fcc_amount;
	}
	
	
}
