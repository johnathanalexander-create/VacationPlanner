package com.johnathanalexander.vacationplanner.app.model;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name="prepayment")
public class Prepayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="vacation_id", nullable=true)
	private Vacation vacation_id;
	
	@Column(length=100, nullable=false)
	private String description;
	
	@Column(length=50)
	private String type;
	
	@Column(length=50)
	private String vendor;
	
	@Column()
	private boolean is_refundable = false;
	
	@Column()
	private boolean is_refund_requested = false;
	
	@Column()
	private boolean is_refund_received = false;
	
	@Column()
	private BigDecimal amount;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="payment_source", nullable=false)
	private PrepaymentSource payment_source;
	
	@Column(length=150)
	private String notes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Vacation getVacation() {
		return vacation_id;
	}

	public void setVacation(Vacation vacation) {
		this.vacation_id = vacation;
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

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public boolean isRefundable() {
		return is_refundable;
	}

	public void setIsRefundable(boolean is_refundable) {
		this.is_refundable = is_refundable;
	}

	public boolean isRefundRequested() {
		return is_refund_requested;
	}

	public void setIsRefundRequested(boolean is_refund_requested) {
		this.is_refund_requested = is_refund_requested;
	}

	public boolean isRefundReceived() {
		return is_refund_received;
	}

	public void setIsRefundReceived(boolean is_refund_received) {
		this.is_refund_received = is_refund_received;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public PrepaymentSource getPaymentSource() {
		return payment_source;
	}

	public void setPaymentSource(PrepaymentSource payment_source) {
		this.payment_source = payment_source;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}
