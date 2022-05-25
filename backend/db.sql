CREATE DATABASE ipayroll_db;

CREATE TABLE rates(
    id SERIAL PRIMARY KEY,
    rank VARCHAR(20) NOT NULL UNIQUE,
    salary REAL NOT NULL,
    bonus REAL NOT NULL,
    tax_relief REAL NOT NULL,
    income_tax REAL NOT NULL,
    tier_one REAL NOT NULL,
    tier_two REAL NOT NULL,
    loan_deduction REAL NOT NULL
);

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    department VARCHAR(20) NOT NULL,
    rank VARCHAR(20) REFERENCES rates(rank) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    work_start_date DATE NOT NULL,
    snnit_number VARCHAR(20) NOT NULL,
    loan_status BOOLEAN NOT NULL
);

<<<<<<< HEAD
=======
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(10) NOT NULL,
    admin_role BOOLEAN NOT NULL,
    FOREIGN KEY (email) REFERENCES employees(email) ON DELETE CASCADE  
);
>>>>>>> 5b404a3c92df0af1e844e04f3f4355919594ee3b


CREATE TABLE loans(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    initial_amount REAL NOT NULL,
    amount_left REAL NOT NULL,
    approval_status BOOLEAN NOT NULL
);


CREATE TABLE wages(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    salary REAL NOT NULL,
    bonus REAL NOT NULL,
    tax_relief REAL NOT NULL,
    income_tax REAL NOT NULL,
    loan_deduction REAL NOT NULL,
    loan_remainder REAL NOT NULL,
    tier_one REAL NOT NULL,
    tier_two REAL NOT NULL,
    total_earnings REAL NOT NULL,
    total_deductions REAL NOT NULL,
    total_tiers REAL NOT NULL,
    net_salary REAL NOT NULL,
    CONSTRAINT WAGE_PER_MONTH UNIQUE(employee_id, month, year)
);


INSERT INTO
    rates(
    rank,
    salary,
    bonus,
    tax_relief,
    income_tax,
    tier_one,
    tier_two,
    loan_deduction
    )
VALUES
    (
        "Upper",
        10000,
        0.1,
        0.05,
        0.13,
        0.13,
        0.26,
        0.2
    );

    INSERT INTO
    rates(
    rank,
    salary,
    bonus,
    tax_relief,
    income_tax,
    tier_one,
    tier_two,
    loan_deduction
    )
VALUES
    (
        "Mid",
        7000,
        0.2,
        0.05,
        0.13,
        0.13,
        0.26,
        0.2
    );

    INSERT INTO
    rates(
    rank,
    salary,
    bonus,
    tax_relief,
    income_tax,
    tier_one,
    tier_two,
    loan_deduction
    )
VALUES
    (
        "Lower",
        5000,
        0.2,
        0.05,
        0.13,
        0.13,
        0.26,
        0.2
    );


<<<<<<< HEAD
=======


>>>>>>> 5b404a3c92df0af1e844e04f3f4355919594ee3b
    /*
CREATE TABLE work_hours(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) NOT NULL,
    work_date DATE NOT NULL,
    working_hours REAL NOT NULL,
    CONSTRAINT ONE_HOURS_PER_DAY UNIQUE(employee_id, work_date)
);


CREATE TABLE work_hours(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    over_time REAL,
    CONSTRAINT ONE_HOURS_PER_DAY UNIQUE(employee_id, work_date)
);
*/
<<<<<<< HEAD

--CREATE extension IF NOT EXISTS "uuid-ossp";

/*CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    upassword VARCHAR(255) NOT NULL,
    department VARCHAR(50)
);*/
=======
>>>>>>> 5b404a3c92df0af1e844e04f3f4355919594ee3b
