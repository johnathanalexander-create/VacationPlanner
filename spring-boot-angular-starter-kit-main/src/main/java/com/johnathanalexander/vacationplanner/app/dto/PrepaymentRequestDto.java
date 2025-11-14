package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

import com.johnathanalexander.vacationplanner.app.model.Vacation;

public record PrepaymentRequestDto(
			Long id,
			Long vacation_id,
			String description,
			String type,
			String vendor,
			boolean isRefundable,
			boolean isRefundRequested,
			boolean isRefundReceived,
			BigDecimal amount,
			PrepaymentSourceRequestDto paymentSource,
			String notes
		) {
	public String toString() {
		return "vacationID: " + vacation_id;
	}
}
