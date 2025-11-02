package com.johnathanalexander.vacationplanner.app.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentSourceDto;
import com.johnathanalexander.vacationplanner.app.model.Prepayment;
import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;

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
				prepayment.isRefundable(),
				prepayment.isRefundRequested(),
				prepayment.isRefundReceived(),
				prepayment.getAmount(),
				prepayment.getPaymentSource(),
				prepayment.getNotes()
		);
	}
	
	public static PrepaymentSourceDto toPrepaymentSourceDTO(PrepaymentSource source) {
		return new PrepaymentSourceDto(
				source.getId(),
				source.isActive(),
				source.getName(),
				source.getCashbackRate()
		);
	}
}
