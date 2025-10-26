package com.angelokezimana.starter.vacationplanner.app.model;

import jakarta.persistence.*;

@Entity
@Table(name="confirmation")
public class Confirmation {
	@Id
	private long id;
	
	@ManyToOne
	@JoinColumn(name="vacation_id", referencedColumnName="id")
	private Vacation vacation;
	
	@Column()
	private String description;
	
	@Column()
	private String type;
	
	@Column()
	private String confirmation_code;
	
	@Column()
	private String date;
	
	@Column()
	private String time;
	
	@Column()
	private String notes;

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getConfirmationCode() {
		return confirmation_code;
	}

	public void setConfirmationCode(String confirmation_code) {
		this.confirmation_code = confirmation_code;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
	
	
}
