/* Vacation DB Scripts Run Order: 2 */
use vacation_db;
/*Config Types: string, number, boolean, date*/

set foreign_key_checks = 0; 

insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("hotel_name_primary", "Primary Hotel", "", "", true, false, 1, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("hotel_name_secondary", "Secondary Hotel", "", "", true, false, 2, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("flight_primary", "Primary Flight", "", "", true, false, 3, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("flight_secondary", "Secondary Flight", "", "", true, false, 4, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("primary_flight_class", "Primary Flight Class", "", "", true, false, 5, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("secondary_flight_class", "Secondary Flight Class", "", "", true, false, 6, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("travel_insurance_policy", "Travel Insurance Policy #", "", "", true, false, 7, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("room_type_primary", "Primary Hotel Room Type", "", "", true, false, 8, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("room_type_secondary", "Secondary Hotel Room Type", "", "", true, false, 9, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("main_title", "Vacation Title", "", "", true, true, 10, 'string', true, -1);

insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("additional_funding_label", "Additional Funding Label", "Credit Card Funding", "", false, false, 11, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("default_mandatory_task_label", "Default Mandatory Task Label", "Mandatory", "", false, false, 12, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("default_hotel_label_name", "Default Hotel Label", "Hotel", "", false, false, 13, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("credit_card_primary", "Primary Credit Card", "Wells Fargo", "", false, false, 14, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("credit_card_secondary", "Secondary Credit Card", "SavorOne", "", false, false, 15, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("default_funding_items", "Default Funding Items", "Main Funding,Estimated Upcoming Funding,Prepayment Cashback", "", false, false, 16, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("prepayment_source_options", "Budget Goal Label", "Goal", "", false, false, 17, 'string', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("tsa_known_traveller_number", "TSA Known Traveller Number", "TT13QRGSS", "", false, false, 18, 'string', true, -1);

insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("spa_budgeted_tip_rate", "Spa Budgeted Tip Rate", "0.2", "", false, false, 19, 'number', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("budget_buffer_rate", "Budget Buffer Rate", "0.06", "", false, false, 20, 'number', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("haircut_autobudget_amount", "Haircut Autobudget Amount", "100.00", "", false, false, 21, 'number', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("task_list_days_out_highlight_upcoming_due_date", "Task List Days Out for Upcoming Due Date", "3", "", false, false, 22, 'number', true, -1);

insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("is_employed", "Is Employed", "True", "", true, false, 23, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("is_funded", "Is Funded", "True", "", true, false, 24, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("is_transportation_funded", "Is Transportation Purchased", "False", "", true, false, 25, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("use_automatic_credit_card_funding", "Use Automatic Credit Card Funding", "True", "", true, false, 26, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("use_automatic_funding_items", "Use Automatic Funding Items", "True", "", true, false, 27, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("enable_budget_buffer", "Enable Budget Buffer", "True", "", true, false, 28, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("enable_automatic_task_list", "Enable Automatic Task List", "True", "", true, false, 29, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("is_cancelled", "Is Cancelled", "False", "", true, false, 30, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("enable_haircut_autobudget", "Enable Haircut Autobudget", "True", "", true, false, 31, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("trip_dashboard_task_completion_mandatory_only", "Trip Dashboard Task Completion Mandatory Only", "True", "", true, false, 32, 'boolean', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("trip_start_date", "Trip Start Date", "", "", true, true, 33, 'date', true, -1);
insert into vacation_config_item (config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values("trip_end_date", "Trip End Date", "", "", true, false, 34, 'date', true, -1);

insert into vacation_config_item(config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values('tab_disable_spa', 'Disable Spa Tab', "False", "", false, false, 35, 'boolean', true, -1);
insert into vacation_config_item(config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values('tab_disable_research', 'Disable Research Tab', "False", "", false, false, 35, 'boolean', true, -1);
insert into vacation_config_item(config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values('tab_disable_calendar', 'Disable Calendar Tab', "False", "", false, false, 35, 'boolean', true, -1);
insert into vacation_config_item(config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values('tab_disable_packing', 'Disable Packing Tab', "False", "", false, false, 35, 'boolean', true, -1);
insert into vacation_config_item(config_key, config_label, config_value, config_notes, primary_config, required, config_order, config_type, template, vacation_config_id)
values('tab_disable_trip_analysis', 'Disable Trip Analysis Tab', "False", "", false, false, 35, 'boolean', true, -1);

insert into fcc(vacation_id, fcc_title, fcc_amount, template)
values(-1, "Main Funding", 0, true);
insert into fcc(vacation_id, fcc_title, fcc_amount, template)
values(-1, "Estimated Upcoming Funding", 0, true);
insert into fcc(vacation_id, fcc_title, fcc_amount, template)
values(-1, "Prepayment Cashback", 0, true);

set foreign_key_checks = 1;

insert into prepayment_source(name, cashback_rate)
values ("Castlight Gift Card", 0.00);
insert into prepayment_source(name, cashback_rate)
values ("General Gift Card", 0.00);
insert into prepayment_source(name, cashback_rate)
values ("Wells Fargo Credit Card", 0.02);
insert into prepayment_source(name, cashback_rate)
values ("Quicksilver Credit Card", 0.015);
insert into prepayment_source(name, cashback_rate)
values ("SavorOne Credit Card", 0.01);
insert into prepayment_source(name, cashback_rate)
values ("Citibank Credit Card", 0.00);
insert into prepayment_source(name, cashback_rate)
values ("Other Credit Card", 0.00);
insert into prepayment_source(name, cashback_rate)
values ("BOM Debit Card", 0.00);
insert into prepayment_source(name, cashback_rate)
values ("Capital One Debit Card", 0.00);
insert into prepayment_source(name, cashback_rate)
values ("SavorOne CC - Dining", 0.03);
insert into prepayment_source(name, cashback_rate)
values ("Other", 0.00);

