package com.johnathanalexander.vacationplanner.app.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name="budget_item")
public class BudgetItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_id")
	private Vacation vacation;
	
	@Column(length=75)
	private String item;
	
	@Column()
	private BigDecimal amount;
	
	@Column()
	private BigDecimal amount_goal;
	
	@Column()
	private BigDecimal cash_requirement;
	
	@Column(length=150)
	private String notes;
	
	@Column()
	private byte budget_item_order;

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

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getGoalAmount() {
		return amount_goal;
	}

	public void setGoalAmount(BigDecimal goal_amount) {
		this.amount_goal = goal_amount;
	}

	public BigDecimal getCashRequirement() {
		return cash_requirement;
	}

	public void setCashRequirement(BigDecimal cash_requirement) {
		this.cash_requirement = cash_requirement;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public byte getBudgetItemOrder() {
		return budget_item_order;
	}

	public void setBudgetItemOrder(byte budget_item_order) {
		this.budget_item_order = budget_item_order;
	}
	
	@Override
	public String toString() {
		return "id: " + id + " / item name: " + item + " / amount: " + amount;
	}
	
}
