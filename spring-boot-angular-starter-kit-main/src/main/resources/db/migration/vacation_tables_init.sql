drop database if exists vacation_db;

create table vacation
(
	id BIGINT primary key AUTO_INCREMENT,
    name varchar(250) not null,
    state varchar(25) default 'Draft',
    `owner` BIGINT,
	notes text,
	'funding_comps_credits' varchar(500) default '{"Main Funding":{"value":"","isEditing":""},"Estimated Upcoming Funding":{"value":"","isEditing":false}}'
);

create table fcc(
	id BIGINT primary key AUTO_INCREMENT,
	vacation_id BIGINT not null,
	fcc_title varchar(50) not null,
	fcc_amount decimal(6,2), 
	foreign key (vacation_id)
	references vacation(id) on delete cascade
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
	config_order tinyint,
    foreign key (vacation_config_id)
    references vacation_config(id) on delete cascade
);

create table default_config_item
(
	config_key varchar(50) primary key,
	config_label varchar(50) not null,
	config_value varchar(100),
	notes varchar(50),
	primary_config boolean default false,
	required boolean default false,
	active boolean default true,
	config_order tinyint
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
	payment_source BIGINT,
	notes varchar(150),
	foreign key (vacation_id)
	references vacation(id) on delete cascade,
	foreign key (payment_source)
	references prepayment_source (id)
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

create table prepayment_source(
	id bigint primary key AUTO_INCREMENT,
	active boolean default true,
	name varchar(25) not null,
	cashback_rate decimal(4,3)
);

create table spa(
	id bigint primary key AUTO_INCREMENT,
	vacation_id bigint not null,
	description varchar(75) not null,
	location varchar(100) not null,
	treatment_date varchar(10) not null,
	treatment_time varchar(10),
	price decimal(6,2),
	foreign key (vacation_id)
	references vacation(id) on delete cascade
);

create table budget_item(
	id bigint primary key AUTO_INCREMENT,
	vacation_id bigint not null,
	active boolean default true,
	item varchar(75) not null,
	amount decimal(7,2),
	amount_goal decimal(7,2),
	cash_requirement decimal(5,0),
	notes varchar(150),
	budget_item_order tinyint,
	foreign key (vacation_id)
	references vacation(id) on delete cascade
);

create table sticky_note(
 id bigint primary key AUTO_INCREMENT,
 vacation_id bigint not null,
 title varchar(30),
 content varchar(1000),
 note_size varchar(5) default 'md',
 foreign key (vacation_id)
 references vacation(id) on delete cascade
);

create table message(
	id bigint primary key AUTO_INCREMENT,
	sticky_note_id bigint not null,
	foreign key (sticky_note_id)
	references sticky_note(id) on delete cascade
);

/*Packing*/

create table luggage_set(
	id bigint primary key AUTO_INCREMENT,
	vacation_id bigint not null,
	title varchar(50) not null,
	foreign key (vacation_id)
	references vacation(id) on delete cascade
);

create table pack_set(
	id bigint primary key AUTO_INCREMENT,
	luggage_set_id bigint not null,
	title varchar(50) not null,
	foreign key (luggage_set_id)
	references luggage_set(id) on delete cascade
);

create table packed_item(
	id bigint primary key AUTO_INCREMENT,
	luggage_set_id bigint,
	pack_set_id bigint,
	title varchar(50) not null,
	status ENUM('Yes', 'No', 'WIP') default 'No',
	mandatory ENUM('Mandatory', 'Recommended', 'Optional') default 'Mandatory',
	foreign key (luggage_set_id)
	references luggage_set(id) on delete cascade,
	foreign key (pack_set_id)
	references pack_set(id) on delete cascade
);

/*End of Packing*/

/*Tasks*/

create table task_set
(
	id bigint primary key AUTO_INCREMENT,
	vacation_id bigint not null,
	task_set_title varchar(40),
	template boolean default false,
	foreign key (vacation_id)
	references vacation(id) on delete cascade
);

create table task
(
	id bigint primary key auto_increment,
	task_set_id bigint not null,
	task_title varchar(100) not null,
	task_due_date varchar(10),
	task_status ENUM('Yes', 'No', 'WIP') default 'No',
	task_mandatory_level ENUM('Mandatory', 'Recommended', 'Optional') default 'Mandatory',
	template boolean default false,
	foreign key (task_group_id)
	references task_set(id) on delete cascade
);

/* End of Tasks */