package com.johnathanalexander.vacationplanner.app.dto;

import java.math.BigDecimal;

public record PrepaymentDto (
			Long id,
			String description,
			String type,
			String vendor,
			boolean isRefundable,
			boolean isRefundRequested,
			boolean isRefundReceived,
			BigDecimal amount,
			String paymentSource,
			String notes
		){

}
