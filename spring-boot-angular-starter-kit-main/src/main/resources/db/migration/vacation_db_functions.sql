use vacation_db;

drop function if exists calculate_budget_buffer;

delimiter //

create function calculate_budget_buffer(v_vacation_id bigint, v_vacation_config_id bigint)
returns float
no sql
begin

declare total float;
declare buffer_rate_value varchar(100);
declare buffer_rate float;

select sum(amount) into total from budget_item where vacation_id=v_vacation_id and active=true;
select config_value into buffer_rate_value from vacation_config_item where vacation_config_id = v_vacation_config_id and config_key = "budget_buffer_rate";

if buffer_rate_value = ""
then
	set buffer_rate = 0.06;
else
	set buffer_rate = cast(buffer_rate_value as float);
end if;

if buffer_rate < 0
then
	set buffer_rate = buffer_rate*-1;
end if;

return total * buffer_rate;

end//

delimiter ;