var express = require("express");
var router = express.Router();
const pool = require("../db");
const tool = require('../tools');

router.get("/", function (req, res, next) {
    res.send("Employee Dashboard");
});

router.get("/all", async (req, res, next) => {
    try {
        const employees = await pool.query("SELECT * FROM employees");
        res.json(employees.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.get("/:id", async (req, res, next) => {
    try {
        const employee = await pool.query("SELECT * FROM employees WHERE id=($1)", [req.params.id]);
        res.json(employee.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.put("/update/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "firstname",
            "surname",
            "date_of_birth",
            "gender",
            "email",
            "department",
            "rank",
            "phone_number",
            "work_start_date",
            "ssnit_number",
            "tax_relief",
            "loan_status"
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (let i = 0; i < collumns.length; i++) {

            if (req.body.hasOwnProperty(collumns[i])) {
                check = false;
                let key = collumns[i]
                const value = req.body[key];
                const update = await pool.query(`UPDATE employees SET ${key} = $1 WHERE id = $2`,
                    [value, id]);
                output_str += `Employee ${key} was updated with value ${value}\n`;
            }
        }

        if (check) {
            res.send("Attribute passed does not exist or null attribute passed")
        } else {
            res.send(output_str);
        }

    } catch (e) {
        res.send(e.message)
    }

})

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const del = await pool.query("DELETE FROM employees where id = $1", [id])
        res.send("Employee was succesfully deleted")
    } catch (e) {
        res.send(e.message);
    }

})

router.post("/send", async (req, res) => {
    try {
        const {
            firstname,
            surname,
            date_of_birth,
            gender,
            email,
            department,
            rank,
            phone_number,
            work_start_date,
            ssnit_number,
            admin_role
        } = req.body;


        const newEmployee = await pool.query(`INSERT INTO employees(
            firstname,
            surname,
            date_of_birth,
            gender,
            email,
            department,
            rank,
            phone_number,
            work_start_date,
            ssnit_number,
            tax_relief,
            loan_status
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`
            , [firstname,
                surname,
                date_of_birth,
                gender,
                email,
                department,
                rank,
                phone_number,
                work_start_date,
                ssnit_number,
                false,
                false])

        //Creates a user in the user table for new employee. Allows employee to log in.
        let user_password = tool.generatePassword();

        const newUser = await pool.query(`INSERT INTO users(
            "email",
            "user_password",
            "admin_role"
          ) VALUES($1,$2,$3) RETURNING *`
            , [email,
                user_password,
                admin_role
            ])

        let message =
            `\tHello ${firstname}, your Amalitech iPayroll account is now active. Kindly sign in with the following credentials.
              Email: ${email}
              Password: ${user_password}

              Regards,
              The HR Team
              `;
        let subject = "iPayroll Account";

        tool.sendMail(email, subject, message).catch(console.error);
        res.send("Employee: " + JSON.stringify(newEmployee.rows) + "\n" + "User: " + JSON.stringify(newUser.rows));


    } catch (e) {
        res.send(e.message);
    }
})

router.get("/retrieve/:email", async (req, res, next) => {
    try {
        const employee = await pool.query("SELECT * FROM employees WHERE email=($1)", [req.params.email]);
        res.json(employee.rows[0]);
    } catch (e) {
        res.send(e.message)
    }

})


module.exports = router;