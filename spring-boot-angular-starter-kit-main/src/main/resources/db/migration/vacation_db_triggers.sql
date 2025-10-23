drop trigger if exists generate_vacation_config;
drop trigger if exists generate_default_config_items;

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

DELIMITER ;