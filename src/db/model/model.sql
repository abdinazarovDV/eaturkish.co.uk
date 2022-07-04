create database ea_turkish;
\c ea_turkish

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create table users (
    user_id uuid not null default uuid_generate_v4() primary key,
    user_first_name varchar(32) not null,
    user_last_name varchar(32),
    user_email_address varchar(64) not null,
    user_password varchar(64) not null,
    user_phone varchar(16),
    created_at timestamp default current_timestamp
);

create table category (
    category_id uuid not null default uuid_generate_v4() primary key,
    category_name varchar(64) not null
);

create table news (
    news_id uuid not null default uuid_generate_v4() primary key,
    news_title varchar(1024) not null,
    news_description text not null,
    news_picture varchar(128),
    created_at timestamp default current_timestamp
);

create table foods (
    food_id uuid not null default uuid_generate_v4() primary key,
    category_id uuid references category(category_id) on delete cascade,
    food_name varchar(128) not null,
    food_description text,
    food_picture varchar(128),
    food_price numeric not null,
    is_active boolean default true,
    created_at timestamp default current_timestamp
);

create table temprory_code (
    tc_id uuid not null default uuid_generate_v4() primary key,
    temp_code numeric,
    email_address varchar(64) not null unique,
    user_first_name varchar(64),
    user_password varchar(128)
);

create table orders (
    orders_id uuid not null default uuid_generate_v4() primary key,
    user_id uuid references users(user_id) on delete cascade,
    food_id uuid references foods(food_id) on delete cascade,
    count integer not null,
    amount numeric not null,
    admin_view boolean not null default false
);

create table own_menu (
    own_menu_id uuid not null default uuid_generate_v4() primary key,
    user_id uuid references users(user_id) on delete cascade,
    food_id uuid references foods(food_id) on delete cascade
);

create table messages (
    message_id uuid not null default uuid_generate_v4() primary key,
    user_id uuid references users(user_id) on delete cascade,
    message_body text not null
);
