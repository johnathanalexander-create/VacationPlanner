package com.johnathanalexander.vacationplanner.app.model;

import java.math.BigDecimal;

import com.johnathanalexander.vacationplanner.app.enums.Status;

import jakarta.persistence.*;

@Entity
@Table(name="purchase_item")
public class PurchaseItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_id")
	private Vacation vacation;
	
	@Column(length=50)
	private String title;
	
	@Column()
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@Column()
	private BigDecimal cost;

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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public BigDecimal getCost() {
		return cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}
}
