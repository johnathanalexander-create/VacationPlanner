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
    `owner` BIGINT
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
    config_name varchar(50) not null,
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
	config_value varchar(100),
	notes varchar(50),
	primary_config boolean default false,
	required boolean default false,
	active boolean default true
);