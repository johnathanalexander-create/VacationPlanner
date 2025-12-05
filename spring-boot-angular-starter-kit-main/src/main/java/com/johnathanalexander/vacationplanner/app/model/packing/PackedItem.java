package com.johnathanalexander.vacationplanner.app.model.packing;

import com.johnathanalexander.vacationplanner.app.enums.Mandatory;
import com.johnathanalexander.vacationplanner.app.enums.Status;

import jakarta.persistence.*;

@Entity
@Table(name="packed_item")
public class PackedItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="pack_set_id")
	private PackSet packSet;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="luggage_set_id")
	private LuggageSet luggageSet;
	
	@Column(length=50)
	private String title;
	
	@Column()
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@Column()
	@Enumerated(EnumType.STRING)
	private Mandatory mandatory;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LuggageSet getLuggageSet() {
		return luggageSet;
	}

	public void setLuggageSet(LuggageSet luggageSet) {
		this.luggageSet = luggageSet;
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

	public Mandatory getMandatory() {
		return mandatory;
	}

	public void setMandatory(Mandatory mandatory) {
		this.mandatory = mandatory;
	}
	
	
}
