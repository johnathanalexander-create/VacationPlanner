use vacation_db;

drop procedure if exists update_all_trip_states;
drop procedure if exists update_single_trip_state;
drop procedure if exists create_process_log_entry;

delimiter //

create procedure create_process_log_entry(
	IN msg varchar(200),
    IN process_source varchar(100)
)
BEGIN

	if msg <> ""
    then
		insert into process_log (msg, process_source)
		values(msg, process_source);
	end if;
END //


create procedure update_single_trip_state(
	IN vacation_id bigint
)
BEGIN
	/*individual trip config values*/
	declare vacation_state varchar(25);
	declare trip_start_date varchar(100);
	declare trip_end_date varchar(100);
	declare is_transportation_purchased varchar(100);
	declare is_cancelled varchar(100);

	if vacation_id <> -1
	then
		
		/*call create_process_log_entry(concat('running for vacation id = ', vacation_id), 'update_single_trip_state');*/
		call create_process_log_entry(vacation_id, 'updatify');
		
		/* Trip Start Date */
		select vci.config_value
		into trip_start_date
		from vacation as v
		join vacation_config as vc
		join vacation_config_item as vci
		on vci.vacation_config_id=vc.id
		and vc.vacation_id=v.id
		where v.state != 'Cancelled'
		and vci.config_key = 'trip_start_date'
		and v.id = (select vacation_id);
		
		call create_process_log_entry(concat('selected trip start date: ', trip_start_date) , 'update_single_trip_state');
		
		/* Trip End Date */
		select vci.config_value
		into trip_end_date
		from vacation as v
		join vacation_config as vc
		join vacation_config_item as vci
		on vci.vacation_config_id=vc.id
		and vc.vacation_id=v.id
		where v.state != 'Cancelled'
		and vci.config_key = 'trip_end_date'
		and v.id = (select vacation_id);
		
		call create_process_log_entry('select trip end date' , 'update_single_trip_state');
		
		/* Is Transportation Purchased */
		select vci.config_value
		into is_transportation_purchased
		from vacation as v
		join vacation_config as vc
		join vacation_config_item as vci
		on vci.vacation_config_id=vc.id
		and vc.vacation_id=v.id
		where v.state != 'Cancelled'
		and vci.config_key = 'is_transportation_funded'
		and v.id = (select vacation_id);
		
		call create_process_log_entry('select is transportation funded' , 'update_single_trip_state');
		
		/* Cancelled */
		select vci.config_value
		into is_cancelled
		from vacation as v
		join vacation_config as vc
		join vacation_config_item as vci
		on vci.vacation_config_id=vc.id
		and vc.vacation_id=v.id
		and vci.config_key = 'is_cancelled'
		and v.id = (select vacation_id);
		
		call create_process_log_entry('select cancelled' , 'update_single_trip_state');
		
		/* The trip has been cancelled via config, so set the vacation to Cancelled*/
		if is_cancelled = "True"
		then
			call create_process_log_entry('vacation state should be setting to cancelled' , 'update_single_trip_state');
			set vacation_state = "Cancelled";
		end if;
		
		/* Today is sometime between the start and end date of a trip and the trip hasn't been cancelled, so set the trip state to Active*/
		if trip_start_date <> '' and trip_end_date <> ''
		then
			if is_cancelled = "False" and CURDATE() > STR_TO_DATE(trip_start_date, '%m/%d/%Y') and CURDATE() < STR_TO_DATE(trip_end_date, '%m/%d/%Y')
			then
				call create_process_log_entry('vacation state should be setting to active' , 'update_single_trip_state');
				set vacation_state = "Active";
			end if;
		end if;
		
		/* We have a start date and the trip hasn't been cancelled and today is before the trip start date and we have official transportation, so set the state to Official*/
		if trip_start_date <> ''
		then
			if is_cancelled = "False" and CURDATE() < STR_TO_DATE(trip_start_date, '%m/%d/%Y') and is_transportation_purchased = "True"
			then
				call create_process_log_entry('vacation state should be setting to official' , 'update_single_trip_state');
				set vacation_state = "Official";
			end if;
		end if;
		
		/* We have a start date and we haven't cancelled and tdoay is before the start date but we do not have official transportation, so set the state to In Planning*/
		if trip_start_date <> ''
		then
			if is_cancelled = "False" and CURDATE() < STR_TO_DATE(trip_start_date, '%m/%d/%Y') and  is_transportation_purchased = "False"
			then
				call create_process_log_entry('vacation state should be setting to complete' , 'update_single_trip_state');
				set vacation_state = "In Planning";
			end if;
		end if;
		
		/* We have a trip end date and haven't cancelled, and today is after the end date, so set the trip to complete*/
		if trip_end_date <> ''
		then
			if is_cancelled = "False" and CURDATE() > STR_TO_DATE(trip_end_date, '%m/%d/%Y')
			then
				call create_process_log_entry('vacation state should be setting to complete' , 'update_single_trip_state');
				set vacation_state = "Complete";
			end if;
		end if;
		
		if vacation_state <> ''
		then
			call create_process_log_entry(concat('Vacation id ', vacation_id, ' should be setting state to ', vacation_state) , 'update_single_trip_state');
			update vacation as v
			set v.state = (vacation_state)
			where v.id = (vacation_id);

		end if;
    end if;
    
    
    
end//

create procedure update_all_trip_states()
BEGIN

	
	DECLARE done int default false;
	DECLARE vacation_id bigint;
    
	DECLARE cur CURSOR FOR
		select id from vacation where state != 'Cancelled';
		
	/*DECLARE continue handler for not found set done = true;*/
	
	open cur;
	
	cursor_loop: LOOP
		fetch cur into vacation_id;
		
		/*if done THEN
			leave cursor_loop;
		end if;*/
		
	
		call update_single_trip_state(vacation_id);	
	
    end loop cursor_loop;
	close cur;
END //

delimiter ;