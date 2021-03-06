var express = require("express");
var router = express.Router();
const pool = require("../db");
const path = require('path');
const tool = require(path.join(__dirname,"..","tools.js"));

router.get("/all", async (req, res, next) => {
    try {
        const wages = await pool.query("SELECT * FROM wages");
        res.json(wages.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.post("/generate", async (req, res, next) => {
    try {
        const {month,year} = req.body

        let employees = await pool.query("SELECT * FROM employees");
        employees = employees.rows;
        const resultList=[];

        for(const employee of employees){
        let employee_data = await pool.query("SELECT * FROM employees WHERE email=($1)", [employee.email]);
        employee_data = employee_data.rows[0];
        console.log(JSON.stringify(employee_data));
        console.log('\nRank: ',employee_data.rank);
        let employee_rank = await pool.query("SELECT * FROM rates WHERE rank=($1)", [employee_data.rank]);
        employee_rank = employee_rank.rows[0];

        //console.log("data: "+employee_data);
        //console.log("rank: "+employee_rank);

        let loan_deduction;
        let loan_remainder;
        let tax_relief;
        if (employee_data.loan_status) {
            let loan_data = await pool.query("SELECT * FROM loans WHERE employee_id=($1)", [employee_data.id]);
            loan_data = loan_data.rows[0];
            loan_deduction = loan_data.loan_deduction_rate;
            loan_remainder = loan_data.amount_left;
        } else {
            loan_deduction = 0;
            loan_remainder = 0;
        }

        if (employee_data.tax_relief) {

            let tax_relief_data = await pool.query("SELECT monthly_amount FROM tax_relief WHERE employee_email=($1)", [employee.email]);
            tax_relief_data = tax_relief_data.rows[0];
            tax_relief = tax_relief_data.monthly_amount;

        } else {
            tax_relief = 0;
        }

        const result = tool.taxCalc(
            employee_data.id,
            employee_data.firstname,
            employee_data.surname,
            employee_data.department,
            employee_data.ssnit_number,
            employee_data.rank,
            month,
            year,
            employee_rank.salary,
            employee_rank.cash_allowance,
            tax_relief,
            loan_deduction,
            loan_remainder,
            employee_rank.ssnit_tier_one,
            employee_rank.ssnit_tier_two,
            employee_rank.pf_employee,
            employee_rank.pf_employer
        );

       let pdfres = await tool.pdfgen(result);

        const path = `./payslips/${result.employee_id}_${result.month}_${result.year}.pdf`;
        const file = `${result.employee_id}_${result.month}_${result.year}.pdf`;

        console.log(path,"\n",file);

        tool.sendMail(employee.email,"Payslip",`Hello ${employee_data.firstname},
        find attached your payslip for ${result.date}
        
        Regards,
        Finance`,
        {
        "filename": file,    
        "path":path
        }
        ).catch(console.error);

        console.log(pdfres);
        resultList.push(result);
    }
        req.body.resultList = resultList;
        next();

    } catch (e) {
        console.log(e);
        res.send(e.message)
    }

})

router.post("/generate", async (req, res) => {
    try {
        const wageList = req.body.resultList;

        console.log(wageList);

        for(const wage of wageList){
        const {
            employee_id,
            month,
            year,
            salary,
            cash_allowance,
            tax_relief,
            paye,
            loan_deduction,
            loan_remainder,
            ssnit_tier_one,
            ssnit_tier_two,
            ssnit_tier_total,
            pf_employee,
            pf_employer,
            pf_total,
            total_earnings,
            total_deductions,
            take_home_salary
        } = wage;

        const newWage = await pool.query(`INSERT INTO wages(
            employee_id,
            month,
            year,
            salary,
            cash_allowance,
            tax_relief,
            paye,
            loan_deduction,
            loan_remainder,
            ssnit_tier_one,
            ssnit_tier_two,
            ssnit_tier_total,
            pf_employee,
            pf_employer,
            pf_total,
            total_earnings,
            total_deductions,
            take_home_salary
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *`
            , [
                employee_id,
                month,
                year,
                salary,
                cash_allowance,
                tax_relief,
                paye,
                loan_deduction,
                loan_remainder,
                ssnit_tier_one,
                ssnit_tier_two,
                ssnit_tier_total,
                pf_employee,
                pf_employer,
                pf_total,
                total_earnings,
                total_deductions,
                take_home_salary])
            
            if(loan_remainder === 0 && loan_deduction > 0){
                    
                    const del = await pool.query("DELETE FROM loans where employee_id = $1", [employee_id])

                    const update = await pool.query(`UPDATE employees SET loan_status = $1 WHERE id = $2`,
                    [false, employee_id]);
                    
                    console.log("loan was succesfully deleted")


                

            }else{    
        
                const update = await pool.query(`UPDATE loans SET amount_left = $1 WHERE employee_id = $2`,
            [loan_remainder, employee_id]);
                
        }
    }
        

        res.send(wageList);

    } catch (e) {
        console.log(e);
        res.send(e.message);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const wage = await pool.query("SELECT * FROM wages WHERE id=($1)", [req.params.id]);
        res.json(wage.rows);
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
            "salary",
            "cash_allowance",
            "tax_relief",
            "paye",
            "loan_deduction",
            "loan_remainder",
            "ssnit_tier_one",
            "ssnit_tier_two",
            "ssnit_tier_total",
            "pf_employee",
            "pf_employer",
            "pf_total",
            "total_earnings",
            "total_deductions",
            "take_home_salary"
        ]


        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (let i = 0; i < collumns.length; i++) {

            if (req.body.hasOwnProperty(collumns[i])) {
                check = false;
                let key = collumns[i]
                const value = req.body[key];
                const update = await pool.query(`UPDATE wages SET ${key} = $1 WHERE id = $2`,
                    [value, id]);
                output_str += `Wage ${key} was updated with value ${value}\n`;
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
        const del = await pool.query("DELETE FROM wages where id = $1", [id])
        res.send("wage was succesfully deleted")
    } catch (e) {
        res.send(e.message);
    }

})

router.post("/broadcast",async(req,res)=>{
try{






}catch(e){
    console.log(e.message);
    res.send(e);
}



})

module.exports = router;