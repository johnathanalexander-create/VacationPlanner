package com.johnathanalexander.vacationplanner.app.model.packing;

import jakarta.persistence.*;

@Entity
@Table(name="packed_item")
public class PackedItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="luggage_set_id")
	private LuggageSet luggageSet;
	
	@Column(length=50)
	private String title;
	
	@Column()
	private String status;
	
	@Column()
	private String mandatory;

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMandatory() {
		return mandatory;
	}

	public void setMandatory(String mandatory) {
		this.mandatory = mandatory;
	}
	
	
}
