/* Vacation DB Scripts Run Order: 5 */

delimiter //
create event if not exists trip_state_updater
on schedule every 1 DAY
do
begin

	CALL update_all_trip_states();
	
end //

delimiter ;