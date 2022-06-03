var express = require("express");
var router = express.Router();
const pool = require("../db");
const path = require('path');
const tool = require(path.join(__dirname,"..","tools.js"));

router.get("/", function (req, res, next) {
    res.send("loan Dashboard");
});

router.get("/all", async (req, res, next) => {
    try {
        const loans = await pool.query("SELECT * FROM loans");
        res.json(loans.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.post("/send", async (req, res) => {
    try {
        const {
            employee_id,
            month,
            year,
            initial_amount,
            amount_left
        } = req.body;

        const newLoan = await pool.query(`INSERT INTO loans(
            employee_id,
            month,
            year,
            initial_amount,
            amount_left
        ) VALUES($1,$2,$3,$4,$5) RETURNING *`
            , [
                employee_id,
                month,
                year,
                initial_amount,
                amount_left
            ])

        res.json(newLoan.rows);
    } catch (e) {
        res.send(e.message);
    }
})

router.put("/review", async(req,res)=>{

    try {

        let {response,employee_id,deduction_rate} = req.body; // response will be boolean
        let employee = await pool.query(`SELECT firstname , email FROM employees WHERE id = ${employee_id}`);
        employee = employee.rows[0];
        if(response){
            const update = await pool.query(`UPDATE loans SET approval_status = $1, loan_deduction_rate = $2 WHERE employee_id = $3`,
            [response, deduction_rate, employee_id]);
            const update2 = await pool.query(`UPDATE employees SET loan_status = $1 WHERE id = $2`,[response,employee_id]);
            tool.sendMail(
                employee.email,
                "Loan Review",
                `Hello ${employee.firstname},
                your loan request has been accepted at a salary  deduction rate of ${deduction_rate}%.
                Kindly contact the finance department if you have any questions
                    
                Regards,
                The HR Team    
                    `
            )
        }else{

            const del = await pool.query("DELETE FROM loans where employee_id = $1", [employee_id]);

            tool.sendMail(
                employee.email,
                "Loan Review",
                `Hello ${employee.firstname},
                we are sorry to inform you your loan request has been declined.
                Kindly contact the finance department if you have any questions
                    
                Regards,
                The HR Team    
                    `
            )



        }

        res.send("Loan Updated");

    } catch (e) {

        res.send(e.message)
    
    }

} )

router.get("/:id", async (req, res, next) => {
    try {
        const loan = await pool.query("SELECT * FROM loans WHERE id=($1)", [req.params.id]);
        res.json(loan.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.put("/update/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "employee_id",
            "month",
            "year",
            "initial_amount",
            "amount_left"
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (let i = 0; i < collumns.length; i++) {

            if (req.body.hasOwnProperty(collumns[i])) {
                check = false;
                let key = collumns[i]
                const value = req.body[key];
                const update = await pool.query(`UPDATE loans SET ${key} = $1 WHERE id = $2`,
                    [value, id]);
                output_str += `Loan ${key} was updated with value ${value}\n`;
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
        const del = await pool.query("DELETE FROM loans where id = $1", [id])
        res.send("loan was succesfully deleted")
    } catch (e) {
        res.send(e.message);
    }

})

module.exports = router;