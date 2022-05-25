CREATE DATABASE ipayroll_db;

CREATE TABLE rates(
    id SERIAL PRIMARY KEY,
    rank VARCHAR(20) NOT NULL UNIQUE,
    salary REAL NOT NULL,
    cash_allowance REAL NOT NULL,
    paye REAL NOT NULL,
    pf_employee REAL NOT NULL,
    pf_employer REAL NOT NULL,
    ssnit_tier_one REAL NOT NULL,
    ssnit_tier_two REAL NOT NULL
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
    tax_relief BOOLEAN DEFAULT false,
    loan_status BOOLEAN DEFAULT false
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(10) NOT NULL,
    admin_role BOOLEAN NOT NULL,
    FOREIGN KEY (email) REFERENCES employees(email) ON DELETE CASCADE  
);


CREATE TABLE loans(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    initial_amount REAL NOT NULL,
    amount_left REAL NOT NULL,
    loan_deduction_rate REAL DEFAULT 0.0,   --Deduction rate will be calculated and submitted to employee.
    approval_status BOOLEAN DEFAULT false
);

CREATE TABLE tax_relief(
    id SERIAL PRIMARY KEY,
    employee_email VARCHAR(80) REFERENCES employees(email) NOT NULL,
    tax_relief_type VARCHAR(25),
    annual_amomunt REAL NOT NULL,
    monthly_amount REAL NOT NULL,
    relief_desc VARCHAR (100)
);


CREATE TABLE wages(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    salary REAL NOT NULL,
    cash_allowance REAL NOT NULL,
    tax_relief REAL NOT NULL,
    paye REAL NOT NULL,
    loan_deduction REAL NOT NULL,
    loan_remainder REAL NOT NULL,
    ssnit_tier_one REAL NOT NULL,
    ssnit_tier_two REAL NOT NULL,
    ssnit_tier_total REAL NOT NULL,
    total_earnings REAL NOT NULL,
    total_deductions REAL NOT NULL,
    take_home_salary REAL NOT NULL,
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
        "Level 1",
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
        "Level 2",
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
        "Level 3",
        5000,
        0.2,
        0.05,
        0.13,
        0.13,
        0.26,
        0.2
    );




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
