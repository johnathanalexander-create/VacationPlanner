package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;

public record PrepaymentDto (
			Long id,
			String description,
			String type,
			String vendor,
			boolean isRefundable,
			boolean isRefundRequested,
			boolean isRefundReceived,
			BigDecimal amount,
			PrepaymentSource paymentSource,
			String notes
		){

}
