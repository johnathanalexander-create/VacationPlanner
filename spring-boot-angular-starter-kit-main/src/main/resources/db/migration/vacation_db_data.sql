use vacation_db;

insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("hotel_name_primary", "Primary Hotel", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("hotel_name_secondary", "Secondary Hotel", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("flight_primary", "Primary Flight", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("flight_secondary", "Secondary Flight", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("primary_flight_class", "Primary Flight Class", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("secondary_flight_class", "Secondary Flight Class", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("travel_insurance_policy", "Travel Insurance Policy #", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("room_type_primary", "Primary Hotel Room Type", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("room_type_secondary", "Secondary Hotel Room Type", "", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("main_title", "Vacation Title", "", "", true, true);

insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("additional_funding_label", "Additional Funding Label", "Credit Card Funding", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("default_mandatory_task_label", "Default Mandatory Task Label", "Mandatory", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("default_hotel_label_name", "Default Hotel Label", "Hotel", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("credit_card_primary", "Primary Credit Card", "Wells Fargo", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("credit_card_secondary", "Secondary Credit Card", "SavorOne", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("default_funding_items", "Default Funding Items", "Main Funding,Estimated Upcoming Funding,Prepayment Cashback", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("prepayment_source_options", "Budget Goal Label", "Goal", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("tsa_known_traveller_number", "TSA Known Traveller Number", "TT13QRGSS", "", false, false);

insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("spa_budgeted_tip_rate", "Spa Budgeted Tip Rate", "0.2", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("budget_buffer_rate", "Budget Buffer Rate", "0.06", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("haircut_autobudget_amount", "Haircut Autobudget Amount", "100.00", "", false, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("task_list_days_out_highlight_upcoming_due_date", "Task List Days Out for Upcoming Due Date", "3", "", false, false);

insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("is_employed", "Is Employed", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("is_funded", "Is Funded", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("is_transportation_funded", "Is Transportation Purchased", "False", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("use_automatic_credit_card_funding", "Use Automatic Credit Card Funding", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("use_automatic_funding_items", "Use Automatic Funding Items", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("enable_budget_buffer", "Enable Budget Buffer", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("enable_automatic_task_list", "Enable Automatic Task List", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("is_cancelled", "Is Cancelled", "False", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("enable_haircut_autobudget", "Enable Haircut Autobudget", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("trip_dashboard_task_completion_mandatory_only", "Trip Dashboard Task Completion Mandatory Only", "True", "", true, false);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("trip_start_date", "Trip Start Date", "", "", true, true);
insert into default_config_item (config_key, config_label, config_value, notes, primary_config, required)
values("trip_end_date", "Trip End Date", "", "", true, false);

/*Still need to decide how to create the Autogenerated Display Values, or do I even care....those were created
 * to make it easier for the spreadsheet. May not need to do it.*/

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