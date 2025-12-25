/* Vacation DB Scripts Run Order: 3 */

drop trigger if exists generate_vacation_config;
drop trigger if exists generate_default_config_items;
drop trigger if exists autotask_generator;

DELIMITER //
CREATE TRIGGER generate_vacation_config
AFTER INSERT ON vacation
FOR EACH ROW
BEGIN
	INSERT INTO vacation_config (vacation_id)
    VALUES(NEW.id);
END//

CREATE TRIGGER generate_default_config_items
AFTER INSERT ON vacation_config
FOR EACH ROW
BEGIN

	insert into vacation_config_item (vacation_config_id, config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type)
    select NEW.id, template.config_key, template.config_label, template.config_value, template.config_notes, template.primary_config, template.required, template.config_order, template.config_type
    from vacation_config_item as template
    where template.template=true;
    
END//



-- These two triggers are not possible UNLESS I require a trip start date on creation of the vacation
/*CREATE TRIGGER autotask_generator_task_groups
AFTER INSERT on vacation
FOR EACH ROW
BEGIN

	INSERT INTO task_group (vacation_id, task_group_name)
	SELECT NEW.id, tg_template.task_group_template_name
	FROM task_group_template tg_template
	WHERE tg_template.active = true;

END// */

/*CREATE TRIGGER autotask_generator_tasks
AFTER INSERT on task_group
FOR EACH ROW
BEGIN

	-- Allowing a delay on execution to allow for the generate_default_config_items trigger to execute. Need a value 
	DO SLEEP(300); -- Performance not a problem since there is a maximum of one user for this application

	INSERT INTO task(task_group_id, task_description, task_due_date, task_status, task_mandatory_level)
	SELECT New.id, t_template.task_template_description, (NEED TO CALCULATE DUE DATE), "Ready", t_template.task_template_mandatory_level
	FROM task_template t_template
	WHERE t_template = true;

END// */

CREATE TRIGGER autoactive_user
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
	SET NEW.account_locked = false;
	SET NEW.enabled = true;
END//


CREATE TRIGGER create_budget_dashboard_items
AFTER INSERT ON vacation
FOR EACH ROW
BEGIN

	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Dining & Beverages", "", 1);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Entertainment, Exhibits, & Shopping", "", 2);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Gambling", "", 3);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Hotel", "", 4);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Estimated Tipping Costs", "Extra tipping outside of standard tips", 5);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Spa & Salon", "", 6);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Air & Rail Transportation", "Flights, trains, etc.", 7);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Ground Transportation", "Services such as Uber or Limos", 8);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Travel Insurance", "", 9);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "New Clothing", "Pre-trip budgeting for new clothes", 10);
	
	INSERT INTO budget_item(vacation_id, item, notes, budget_item_order)
	VALUES(NEW.id, "Budget Buffer", "Allows a buffer for unexpected costs", 11);

END//



CREATE TRIGGER trip_state_generator_insert
AFTER INSERT on vacation_config_item
FOR EACH ROW
BEGIN
	declare v_vacation_id bigint;
	if NEW.config_key in ('trip_start_date', 'trip_end_date', 'is_cancelled', 'is_funded', 'is_employed', 'is_transportation_funded')
	THEN
		
		select vacation_id into v_vacation_id from vacation_config where id = NEW.vacation_config_id;
		call update_single_trip_state(
			v_vacation_id
        );
	end if;
END//

CREATE TRIGGER trip_state_generator_update
AFTER UPDATE on vacation_config_item
FOR EACH ROW
BEGIN
	declare v_vacation_id bigint;
	if NEW.config_key in ('trip_start_date', 'trip_end_date', 'is_cancelled', 'is_funded', 'is_employed', 'is_transportation_funded')
	THEN
		select vacation_id into v_vacation_id from vacation_config where id = NEW.vacation_config_id;

		call update_single_trip_state(
			v_vacation_id
        );
	end if;
END//


DELIMITER ;