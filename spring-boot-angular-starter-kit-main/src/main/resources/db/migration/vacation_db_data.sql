use vacation_db;

insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Primary Hotel", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Secondary Hotel", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Primary Flight", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Secondary Flight", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Primary Flight Class", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Secondary Flight Class", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Travel Insurance Policy #", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Primary Hotel Room Type", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Secondary Hotel Room Type", "", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Vacation Title", "", "", true, true);

insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Additional Funding Label", "Credit Card Funding", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Default Mandatory Task Label", "Mandatory", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Default Hotel Label", "Hotel", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Primary Credit Card", "Wells Fargo", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Secondary Credit Card", "SavorOne", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Default Funding Items", "Main Funding,Estimated Upcoming Funding,Prepayment Cashback", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Budget Goal Label", "Goal", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("TSA Known Traveller Number", "TT13QRGSS", "", false, false);

insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Spa Budgeted Tip Rate", "0.2", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Budget Buffer Rate", "0.06", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Haircut Autobudget Amount", "100.00", "", false, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Task List Days Out for Upcoming Due Date", "3", "", false, false);

insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Is Employed", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Is Funded", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Is Transportation Purchased", "False", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Use Automatic Credit Card Funding", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Use Automatic Funding Items", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Enable Budget Buffer", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Enable Automatic Task List", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Is Cancelled", "False", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Enable Haircut Autobudget", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Trip Dashboard Task Completion Mandatory Only", "True", "", true, false);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Trip Start Date", "", "", true, true);
insert into default_config_item (config_key, config_value, notes, primary_config, required)
values("Trip End Date", "", "", true, false);

/*Still need to decide how to create the Autogenerated Display Values, or do I even care....those were created
 * to make it easier for the spreadsheet. May not need to do it.*/
