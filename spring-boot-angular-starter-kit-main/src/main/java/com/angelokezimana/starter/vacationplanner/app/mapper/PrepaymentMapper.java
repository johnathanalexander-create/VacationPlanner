package com.angelokezimana.starter.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.angelokezimana.starter.vacationplanner.app.dto.PrepaymentDto;
import com.angelokezimana.starter.vacationplanner.app.model.Prepayment;

public class PrepaymentMapper {
	public static Set<PrepaymentDto> toPrepaymentListDTO(Set<Prepayment> prepayments){
		return prepayments.stream()
				.map(PrepaymentMapper::toPrepaymentDTO)
				.collect(Collectors.toSet());
	}
	public static PrepaymentDto toPrepaymentDTO(Prepayment prepayment) {
		return new PrepaymentDto(
				prepayment.getId(),
				prepayment.getDescription(),
				prepayment.getType(),
				prepayment.getVendor(),
				prepayment.isIs_refundable(),
				prepayment.isIs_refund_requested(),
				prepayment.isIs_refund_received(),
				prepayment.getAmount(),
				prepayment.getPayment_source(),
				prepayment.getNotes()
		);
	}
}
