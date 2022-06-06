CREATE DATABASE ipayroll_db;

CREATE TABLE rates(
    id SERIAL PRIMARY KEY,
    rank VARCHAR(20) NOT NULL UNIQUE,
    salary REAL NOT NULL,
    cash_allowance REAL NOT NULL,
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
    ssnit_number VARCHAR(20) NOT NULL,
    tax_relief BOOLEAN DEFAULT false,
    tin_number VARCHAR(20),
    loan_status BOOLEAN DEFAULT false
);
CREATE TABLE users(
    email VARCHAR(50) PRIMARY KEY,
    user_password VARCHAR(10) NOT NULL,
    admin_role BOOLEAN NOT NULL,
    FOREIGN KEY (email) REFERENCES employees(email) ON DELETE CASCADE
);
CREATE TABLE loans(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) NOT NULL UNIQUE,
    --Employee cannot take more than one loan.
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    initial_amount REAL NOT NULL,
    amount_left REAL NOT NULL,
    loan_deduction_rate REAL DEFAULT 0.0,
    --Deduction rate will be calculated and submitted to employee.
    approval_status BOOLEAN DEFAULT false
);
CREATE TABLE tax_relief(
    id SERIAL PRIMARY KEY,
    employee_email VARCHAR(80) REFERENCES employees(email) NOT NULL,
    tax_relief_type VARCHAR(25),
    annual_amount REAL NOT NULL,
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
    pf_employee REAL NOT NULL,
    pf_employer REAL NOT NULL,
    pf_total REAL NOT NULL,
    total_earnings REAL NOT NULL,
    total_deductions REAL NOT NULL,
    take_home_salary REAL NOT NULL,
    CONSTRAINT WAGE_PER_MONTH UNIQUE(employee_id, month, year)
);
INSERT INTO rates(
        rank,
        salary,
        cash_allowance,
        pf_employee,
        pf_employer,
        ssnit_tier_one,
        ssnit_tier_two
    )
VALUES (
        'Level1',
        10000,
        1500,
        6,
        10.5,
        5.5,
        13.5
    );
INSERT INTO rates(
        rank,
        salary,
        cash_allowance,
        pf_employee,
        pf_employer,
        ssnit_tier_one,
        ssnit_tier_two
    )
VALUES (
        'Level2',
        75000,
        1000,
        6,
        10.5,
        5.5,
        13.5
    );
INSERT INTO rates(
        rank,
        salary,
        cash_allowance,
        pf_employee,
        pf_employer,
        ssnit_tier_one,
        ssnit_tier_two
    )
VALUES (
        'Level3',
        5000,
        500,
        5,
        11.5,
        5.5,
        13.5
    );

INSERT INTO employees(
        firstname,
        surname,
        date_of_birth,
        gender,
        email,
        department,
        rank,
        phone_number,
        work_start_date,
        ssnit_number
    )
VALUES(
        'admin',
        'admin',
        '2000-01-01',
        'Other',
        'admin',
        'admin',
        'Level1',
        '00000000',
        '10-10-2000',
        '00000000'
    );


    INSERT INTO users(
        email,
        user_password,
        admin_role
    )
VALUES(
        'admin',
        'admin',
        true
    );

/*
 
 UPDATE users SET user_password = 'admin' WHERE email = 'admin';
 
 */
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