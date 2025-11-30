package com.johnathanalexander.vacationplanner.app.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnathanalexander.vacationplanner.TODO;
import com.johnathanalexander.vacationplanner.app.calculators.BudgetItemCalculator;
import com.johnathanalexander.vacationplanner.app.dto.BudgetItemDto;
import com.johnathanalexander.vacationplanner.app.dto.ConfirmationDto;
import com.johnathanalexander.vacationplanner.app.dto.PrepaymentDto;
import com.johnathanalexander.vacationplanner.app.dto.SpaDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationConfigItemDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationDto;
import com.johnathanalexander.vacationplanner.app.dto.VacationRequestDto;
import com.johnathanalexander.vacationplanner.app.enums.VacationState;
import com.johnathanalexander.vacationplanner.app.exception.VacationNotFoundException;
import com.johnathanalexander.vacationplanner.app.mapper.VacationMapper;
import com.johnathanalexander.vacationplanner.app.model.BudgetItem;
import com.johnathanalexander.vacationplanner.app.model.Confirmation;
import com.johnathanalexander.vacationplanner.app.model.Prepayment;
import com.johnathanalexander.vacationplanner.app.model.PrepaymentSource;
import com.johnathanalexander.vacationplanner.app.model.Spa;
import com.johnathanalexander.vacationplanner.app.model.Vacation;
import com.johnathanalexander.vacationplanner.app.model.VacationConfig;
import com.johnathanalexander.vacationplanner.app.model.VacationConfigItem;
import com.johnathanalexander.vacationplanner.app.repository.PrepaymentSourceRepository;
import com.johnathanalexander.vacationplanner.app.repository.VacationRepository;
import com.johnathanalexander.vacationplanner.app.service.VacationService;
import com.johnathanalexander.vacationplanner.common.utility.VacationConfigItemUtility;
import com.johnathanalexander.vacationplanner.user.repository.UserRepository;

@Service
@Transactional
public class VacationServiceImpl implements VacationService{
	
	private final VacationRepository vacationRepository;
	private final UserRepository userRepository;
	private final PrepaymentSourceRepository prepaymentSourceRepository;
	
	public VacationServiceImpl(VacationRepository vacationRepository, UserRepository userRepository, PrepaymentSourceRepository prepaymentSourceRepository) {
		this.vacationRepository = vacationRepository;
		this.userRepository = userRepository;
		this.prepaymentSourceRepository = prepaymentSourceRepository;
	}
	
	public VacationDto getVacationById(Long id) {
		Optional<Vacation> vacation = vacationRepository.findById(id);
		
		return VacationMapper.toVacationDto(vacation.get());
	}

	public List<VacationDto> getAllVacationsByOwner(Long id) {
		List<Vacation> vacationList = vacationRepository.getAllVacationsByOwner(id);
		
		return vacationList.stream().map(vacation -> {
			return VacationMapper.toVacationDto(vacation);
		}).collect(Collectors.toList());
	}
	
	public List<Map<String, Object>> getVacationListByOwner(Long id){
		List<Map<String, Object>> map =  vacationRepository.getVacationListByOwner(id);

		return map;
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	public VacationDto createVacation(VacationRequestDto vacationRequestDto, String user) {
		
		Vacation vacation = new Vacation();
		vacation.setName(vacationRequestDto.name());
		vacation.setState(VacationState.IN_PLANNING.getDisplayValue());
		vacation.setOwner(userRepository.findUserIDByEmail(user));
		vacation.setVacationConfig(null);
		
				
		Vacation savedVacation = vacationRepository.save(vacation);

		return VacationMapper.toVacationDto(savedVacation);
	}
	
	private Set<Prepayment> generatePrepaymentsForUpdatedVacation(Vacation updatedVacation, List<PrepaymentDto> prepaymentDtoList){
		Set<Prepayment> prepayments = new HashSet<>();//What we are converting UI prepayments into
		
		for(PrepaymentDto dto : prepaymentDtoList) {
			Prepayment prepayment = updatedVacation.getPrepayments().stream()
										.filter(pp -> pp.getId() == dto.id())
										.findFirst()
										.orElseGet(() ->{
											return new Prepayment();
										});
			//implement this
			//PrepaymentSource paymentSource = prepaymentSourceRepository.findById(dto.payment)
			
			prepayment.setDescription(dto.description());
			prepayment.setType(dto.type());
			prepayment.setVendor(dto.vendor());
			prepayment.setIsRefundable(dto.isRefundable());
			prepayment.setIsRefundRequested(dto.isRefundRequested());
			prepayment.setIsRefundReceived(dto.isRefundReceived());
			prepayment.setAmount(dto.amount());
			prepayment.setPaymentSource(dto.paymentSource());//Update this
			prepayment.setNotes(dto.notes());
			
			if(prepayment.getVacation() == null) {
				prepayment.setVacation(updatedVacation);
			}
			
			prepayments.add(prepayment);
			
			
		}
		
		return prepayments;
	}
	

	private Set<Confirmation> generateConfirmationsForUpdatedVacation(Vacation vacation, List<ConfirmationDto> confirmationDtoList){
		return null;
	}

	private Set<Spa> generateSpaForUpdatedVacation(Vacation vacation, List<SpaDto> spaDtoList){
		return null;
	}
	private Set<VacationConfigItem> generateVacationConfigItemsForUpdatedVacation(Vacation vacation, List<VacationConfigItemDto> vciDtoList){
		return null;
	}
	
	@TODO("Need to create a new exception for vacation config item parsing")
	private Set<BudgetItem> generateBudgetItemsForUpdatedVacation(Vacation vacation, List<BudgetItemDto> budgetItemDtoList){
		Set<BudgetItem> ret = new HashSet<>();
		
		//First, process the dtos into budget item objects
		for(BudgetItemDto dto : budgetItemDtoList) {
			BudgetItem budgetItem = vacation.getBudgetItems().stream()
					.filter(bi -> bi.getId() == dto.id())
					.findFirst()
					.orElseGet(() ->{
						return new BudgetItem();
					});
			
			budgetItem.setItem(dto.item());
			budgetItem.setAmount(dto.amount());
			budgetItem.setGoalAmount(dto.amountGoal());
			budgetItem.setCashRequirement(dto.cashRequirement());
			budgetItem.setNotes(dto.notes());
			budgetItem.setBudgetItemOrder(dto.order());
			
			if(budgetItem.getVacation() == null) {
				budgetItem.setVacation(vacation);
			}
			
			ret.add(budgetItem);
		}
		
		
		//Second, perform special calculations as needed
		try {
			//If budget buffer has been enabled, calculate the budget buffer using the budget buffer rate
			boolean isBudgetBufferEnabled = Boolean.parseBoolean(VacationConfigItemUtility.getVCIValue(vacation.getVacationConfig(), "enable_budget_buffer"));
			
			if(isBudgetBufferEnabled) {
				String budgetBufferRateStr = VacationConfigItemUtility.getVCIValue(vacation.getVacationConfig(), "budget_buffer_rate");
				if(budgetBufferRateStr != null && !budgetBufferRateStr.equals("")) {
					ret.stream()
						.filter(bi -> bi.getItem() == "Budget Buffer")
						.forEach(bi -> bi.setAmount(BudgetItemCalculator.calculateBudgetBuffer(ret, Double.parseDouble(budgetBufferRateStr))));
				}
				
			}
		}catch(Exception e) {
			System.out.println("Unable to parse Vacation Config Item value. Unexpected data type.");
		}
		
		
		
		
		return ret;
	}
	
	@TODO("Payment source should be retrieved using a findById from the id sent via the dto. Dto should implement PrepaymentSourceDto instead of the actual entity")
	@PreAuthorize("hasRole('ROLE_USER')")
	public VacationDto updateVacation(VacationRequestDto vacationRequestDto) {
		
		Vacation updatedVacation = vacationRepository.findById(vacationRequestDto.id())
				.orElseThrow(() -> VacationNotFoundException.forId(vacationRequestDto.id()));

		List<PrepaymentDto> prepaymentDtoList = new ArrayList<>(vacationRequestDto.prepayments());
		List<BudgetItemDto> budgetItemDtoList = new ArrayList<>(vacationRequestDto.budgetItems());
		//List<ConfirmationDto> confirmationDtoList = new ArrayList<>(vacationRequestDto.confirmations());
		//List<SpaDto> spaDtoList = new ArrayList<>(vacationRequestDto.spas());
		
		updatedVacation.setName(vacationRequestDto.name());
		updatedVacation.setState(vacationRequestDto.state());
		updatedVacation.setNotes(vacationRequestDto.notes());
		updatedVacation.setFundingCompsCredits(vacationRequestDto.funding_comps_credits());
		updatedVacation.setPrepayments(this.generatePrepaymentsForUpdatedVacation(updatedVacation, prepaymentDtoList));
		updatedVacation.setBudgetItems(this.generateBudgetItemsForUpdatedVacation(updatedVacation, budgetItemDtoList));
		//updatedVacation.setSpas(this.generateSpaForUpdatedVacation(updatedVacation, spaDtoList));//Populate the null
		//updatedVacation.setConfirmations(this.generateConfirmationsForUpdatedVacation(updatedVacation, confirmationDtoList));
		
		//Need to update Prepayments; Spas, Budget Items, Config, Confirmations
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//Set<Prepayment> prepayments = new HashSet<>();
		//List<PrepaymentDto> prepaymentDtoList = new ArrayList<>(vacationRequestDto.prepayments());

		/*for(int ppIndex = 0; ppIndex < prepaymentDtoList.size(); ppIndex++) {
			PrepaymentDto prepaymentDto = prepaymentDtoList.get(ppIndex);
			
			Prepayment newPrepayment = new Prepayment();
			newPrepayment.setDescription(prepaymentDto.description());
			newPrepayment.setType(prepaymentDto.type());
			newPrepayment.setVendor(prepaymentDto.vendor());
			newPrepayment.setIsRefundable(prepaymentDto.isRefundable());
			newPrepayment.setIsRefundRequested(prepaymentDto.isRefundRequested());
			newPrepayment.setIsRefundReceived(prepaymentDto.isRefundReceived());
			newPrepayment.setAmount(prepaymentDto.amount());
			newPrepayment.setPaymentSource(prepaymentDto.paymentSource());
			newPrepayment.setNotes(prepaymentDto.notes());
			prepayments.add(newPrepayment);
		}*/

		//updatedVacation.setPrepayments(prepayments);		

		Vacation vacation = vacationRepository.save(updatedVacation);
		return VacationMapper.toVacationDto(vacation);

	}
	
	/*public VacationDto setFCC(Long id, String fcc) {
		Vacation updatedVacation = vacationRepository.findById(id)
				.orElseThrow(() -> VacationNotFoundException.forId(id));
		
		updatedVacation.setFundingCompsCredits(fcc);
		
		Vacation response = vacationRepository.save(updatedVacation);
		
		return VacationMapper.toVacationDto(response);
	}
	
	public VacationDto cancel(Long id) {
		Vacation vacationToCancel = vacationRepository.findById(id)
				.orElseThrow(() -> VacationNotFoundException.forId(id));
		
		vacationToCancel.setState("Cancelled");
		
		Vacation response = vacationRepository.save(vacationToCancel);
		
		return VacationMapper.toVacationDto(response);
	}*/
}
