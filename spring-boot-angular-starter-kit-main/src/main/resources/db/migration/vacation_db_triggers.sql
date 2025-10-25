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
    
	INSERT INTO vacation_config_item(vacation_config_Id, config_key, config_label, config_value, config_notes, primary_config, required)
	SELECT NEW.id, def.config_key, def.config_label, def.config_value, def.notes, def.primary_config, def.required
	FROM default_config_item def
	WHERE def.active=true;
    
END//



-- These two triggers are not possible UNLESS I require a trip start date on creation of the vacation
CREATE TRIGGER autotask_generator_task_groups
AFTER INSERT on vacation
FOR EACH ROW
BEGIN

	INSERT INTO task_group (vacation_id, task_group_name)
	SELECT NEW.id, tg_template.task_group_template_name
	FROM task_group_template tg_template
	WHERE tg_template.active = true;

END//

CREATE TRIGGER autotask_generator_tasks
AFTER INSERT on task_group
FOR EACH ROW
BEGIN

	-- Allowing a delay on execution to allow for the generate_default_config_items trigger to execute. Need a value 
	DO SLEEP(300); -- Performance not a problem since there is a maximum of one user for this application

	INSERT INTO task(task_group_id, task_description, task_due_date, task_status, task_mandatory_level)
	SELECT New.id, t_template.task_template_description, (NEED TO CALCULATE DUE DATE), "Ready", t_template.task_template_mandatory_level
	FROM task_template t_template
	WHERE t_template = true;

END//


DELIMITER ;