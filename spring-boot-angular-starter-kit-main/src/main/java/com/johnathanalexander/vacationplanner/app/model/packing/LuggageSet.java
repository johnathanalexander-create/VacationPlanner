package com.johnathanalexander.vacationplanner.app.model.packing;

import java.util.HashSet;
import java.util.Set;

import com.johnathanalexander.vacationplanner.app.model.Vacation;

import jakarta.persistence.*;

@Entity
@Table(name="luggage_set")
public class LuggageSet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_id")
	private Vacation vacation;
	
	@Column(length=50)
	private String title;
	
	@OneToMany(mappedBy="luggageSet", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<PackSet> packSets = new HashSet<>();
	
	@OneToMany(mappedBy="luggageSet", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<PackedItem> packedItems = new HashSet<>();

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

	public Set<PackSet> getPackSets() {
		return packSets;
	}

	public void setPackSets(Set<PackSet> packSets) {
		this.packSets = packSets;
	}
	
	
}
