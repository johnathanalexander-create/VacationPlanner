package com.johnathanalexander.vacationplanner.app.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.johnathanalexander.vacationplanner.user.model.User;

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
	
	@OneToMany(mappedBy="vacation", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<Spa> spas = new HashSet<>();
	
	@OneToMany(mappedBy="vacation", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<BudgetItem> budgetItems = new HashSet<>();
	
	@Column()
	private String funding_comps_credits = "{\"Main Funding\":{\"value\":\"\",\"isEditing\":\"\"},\"Estimated Upcoming Funding\":{\"value\":\"\",\"isEditing\":false}}";
	
	@Column
	private String notes;

	@OneToOne(mappedBy="vacation", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private VacationConfig vacationConfig;
	
	@OneToMany(mappedBy="vacation", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<Confirmation> confirmations = new HashSet<>();

	public VacationConfig getVacationConfig() {
		return vacationConfig;
	}

	public void setVacationConfig(VacationConfig vacationConfig) {
		this.vacationConfig = vacationConfig;
	}
	
	@Override
	public String toString() {
		return id + "/" + name + "/" + funding_comps_credits + "/" + notes + "/" + state + "/" + owner + "/" + this.vacationConfig.toString();
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
	
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getFundingCompsCredits() {
		return funding_comps_credits;
	}

	public void setFundingCompsCredits(String funding_comps_credits) {
		this.funding_comps_credits = funding_comps_credits;
	}

	public Set<Prepayment> getPrepayments() {
		return prepayments;
	}

	public void setPrepayments(Set<Prepayment> prepayments) {
		this.prepayments = prepayments;
	}
	
	public Set<Confirmation> getConfirmations() {
		return confirmations;
	}

	public void setConfirmations(Set<Confirmation> confirmations) {
		this.confirmations = confirmations;
	}

	public Set<Spa> getSpas() {
		return spas;
	}

	public void setSpas(Set<Spa> spas) {
		this.spas = spas;
	}

	public Set<BudgetItem> getBudgetItems() {
		return budgetItems;
	}

	public void setBudgetItems(Set<BudgetItem> budgetItems) {
		this.budgetItems = budgetItems;
	}
}
