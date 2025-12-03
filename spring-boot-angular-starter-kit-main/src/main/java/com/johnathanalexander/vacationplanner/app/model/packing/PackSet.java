package com.johnathanalexander.vacationplanner.app.model.packing;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name="pack_set")
public class PackSet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="luggage_set_id")
	private LuggageSet luggageSet;
	
	@Column(length=50)
	private String title;
	
	@OneToMany(mappedBy="", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	private Set<PackedItem> packedItems = new HashSet<>();

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

	public Set<PackedItem> getPackedItems() {
		return packedItems;
	}

	public void setPackedItems(Set<PackedItem> packedItems) {
		this.packedItems = packedItems;
	}
	
	
}
