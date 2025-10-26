drop table if exists confirmation;
drop table if exists task;
drop table if exists task_group;
drop table if exists prepayment;
drop table if exists calculated_report_data_item;
drop table if exists report_data_item;
drop table if exists report_header;
drop table if exists report;
drop table if exists vacation_config_item;
drop table if exists vacation_config;
drop table if exists vacation;

create table vacation
(
	id BIGINT primary key AUTO_INCREMENT,
    name varchar(250) not null,
    state varchar(25) default 'Draft',
    `owner` BIGINT,
	notes text,
	'funding_comps_credits' varchar(500) default '{"Main Funding":{"value":"","isEditing":""},"Estimated Upcoming Funding":{"value":"","isEditing":false}}'
);

create table vacation_config
(
	id BIGINT primary key AUTO_INCREMENT,
    vacation_id BIGINT not null,
    foreign key (vacation_id)
    references vacation(id) on delete cascade
);

create table vacation_config_item
(
	id BIGINT primary key AUTO_INCREMENT,
    vacation_config_id BIGINT not null,
    config_label varchar(50) not null,
	config_key varchar(50) not null,
    config_value varchar(100),
    config_notes varchar(50),
    primary_config boolean default false,
    required boolean default false,
    foreign key (vacation_config_id)
    references vacation_config(id) on delete cascade
);

create table report
(
	id BIGINT primary key AUTO_INCREMENT,
    vacation_id BIGINT not null,
    title varchar(50) not null,
    active boolean default false,
    foreign key (vacation_id)
    references vacation(id) on delete cascade
);

create table report_header
(
	id BIGINT primary key AUTO_INCREMENT,
    report_id BIGINT not null,
    label varchar(25) not null,
    `order` integer,
    foreign key(report_id)
    references report(id) on delete cascade
);

create table report_data_item
(
	id BIGINT primary key AUTO_INCREMENT,
    report_header_id BIGINT not null,
    `key` varchar(25) not null,
    `value` varchar(25),
    foreign key (report_header_id)
    references report_header(id) on delete cascade
);

create table calculated_report_data_item
(
	id BIGINT primary key AUTO_INCREMENT,
    report_data_item_id BIGINT not null,
    treat_as_header_left boolean default true,
    report_id BIGINT,
    foreign key (report_data_item_id)
    references report_data_item(id) on delete cascade,
    foreign key (report_id)
    references report(id) on delete cascade
);

create table default_config_item
(
	config_key varchar(50) primary key,
	config_label varchar(50) not null,
	config_value varchar(100),
	notes varchar(50),
	primary_config boolean default false,
	required boolean default false,
	active boolean default true
);

create table prepayment
(
	id BIGINT primary key AUTO_INCREMENT,
	vacation_id BIGINT not null,
	description varchar(100) not null,
	type varchar(50),
	vendor varchar(50),
	is_refundable boolean,
	is_refund_requested boolean,
	is_refund_received boolean,
	amount decimal(6,2),
	payment_source varchar(50),
	notes varchar(150),
	foreign key (vacation_id)
	references vacation(id) on delete cascade
);

create table confirmation(
	id bigint primary key AUTO_INCREMENT,
	vacation_id bigint not null,
	description varchar(100) not null,
	type varchar(30),
	confirmation_code varchar(50),
	date varchar(10),
	time varchar(10),
	notes varchar(100),
	foreign key (vacation_id)
	references vacation(id)
);












create table task_group
(
	id bigint primary key AUTO_INCREMENT,
	vacation_id bigint not null,
	task_group_name varchar(40),
	foreign key (vacation_id)
	references vacation(id) on delete cascade
);

create table task
(
	id bigint primary key auto_increment,
	task_group_id bigint not null,
	task_description varchar(100) not null,
	task_due_date varchar(10),
	task_status varchar(10),
	task_mandatory_level varchar(15)
	foreign key (task_group_id)
	references task_group(id) on delete cascade
);

create table task_group_template
(
	id bigint primary key auto_increment,
	task_group_template_name varchar(40) not null,
	active boolean default true
);

create table task_template
(
	id bigint primary key AUTO_INCREMENT,
	task_group_template_id bigint not null,
	task_template_description varchar(100) not null,
	task_template_days_out_due tinyint not null,
	task_template_mandatory_level varchar(15),
	active boolean default true,
	foreign key (task_group_template_id)
	references task_group_template(id) on delete cascade
);