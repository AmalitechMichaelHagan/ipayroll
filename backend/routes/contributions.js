var express = require("express");
var router = express.Router();
const pool = require("../db");
const tool = require('../Tools');

router.get("/ssnit", async(req, res, next) => {
    try {

    const {month,year} = req.body;
    var date = '';
    let data = [];

    switch(month){
        case 1: date = `January ${year}`;break;
        case 2: date = `February ${year}`;break;
        case 3: date = `March ${year}`;break;
        case 4: date = `April ${year}`;break;
        case 5: date = `May ${year}`;break;
        case 6: date = `June ${year}`;break;
        case 7: date = `July ${year}`;break;
        case 8: date = `August ${year}`;break;
        case 9: date = `September ${year}`;break;
        case 10: date = `October ${year}`;break;
        case 11: date = `November ${year}`;break;
        case 12: date = `December ${year}`;break;
      }
        
        let wages = await pool.query(`SELECT employee_id, salary, ssnit_tier_one, ssnit_tier_two, ssnit_tier_total FROM wages WHERE month = ${month} AND year = ${year}`);
        wages = wages.rows;

         
        for(let i = 0; i<wages.length; i++){

            let employeedata = await pool.query(`SELECT firstname, surname, ssnit_number, rank FROM employees where id = ${wages[i].employee_id}`);
        employeedata = employeedata.rows[0];
      
            let rates = await pool.query(`SELECT ssnit_tier_one, ssnit_tier_two FROM rates WHERE rank='${employeedata.rank}'`)
        rates = rates.rows[0];
  
        data.push({
           "Date": date,
           "SSNIT_ID": employeedata.ssnit_number,
           "First Name": employeedata.firstname,
           "Last Name":employeedata.surname,
           "Salary":wages[i].salary,
           "Tear_1_Rate":rates.ssnit_tier_one,
           "Tear_2_Rate":rates.ssnit_tier_two,
           "Tear_1_Amount":wages[i].ssnit_tier_one,
           "Tear_2_Amount":wages[i].ssnit_tier_two,
           "Total_Contribution":wages[i].ssnit_tier_total
           }); 

        }
     

    res.send(data);
    
} catch (e) {
        res.send(e.message)
    }

})


router.get("/gra", async (req,res,next)=>{
    try {

        const {month,year} = req.body;
        var date = '';
        let data = [];
    
        switch(month){
            case 1: date = `January ${year}`;break;
            case 2: date = `February ${year}`;break;
            case 3: date = `March ${year}`;break;
            case 4: date = `April ${year}`;break;
            case 5: date = `May ${year}`;break;
            case 6: date = `June ${year}`;break;
            case 7: date = `July ${year}`;break;
            case 8: date = `August ${year}`;break;
            case 9: date = `September ${year}`;break;
            case 10: date = `October ${year}`;break;
            case 11: date = `November ${year}`;break;
            case 12: date = `December ${year}`;break;
          }
            
            let wages = await pool.query(`SELECT employee_id, salary, cash_allowance, ssnit_tier_one, pf_employee, tax_relief, paye FROM wages WHERE month = ${month} AND year = ${year}`);
            wages = wages.rows;
             
            for(let i = 0; i<wages.length; i++){
    
                let employeedata = await pool.query(`SELECT firstname, surname, tin_number FROM employees where id = ${wages[i].employee_id}`);
            employeedata = employeedata.rows[0];
      
            data.push({
               "Date": date,
               "TIN Number": employeedata.ssnit_number,
               "First Name": employeedata.firstname,
               "Last Name":employeedata.surname,
               "Salary":wages[i].salary,
               "Cash Allowance":wages[i].cash_allowance,
               "SSNIT Tear 1":wages[i].ssnit_tier_one,
               "Provident Fund":wages[i].pf_employee,
               "Tax Relief":wages[i].tax_relief,
               "Paye":wages[i].paye
               }); 
    
            }
         
    
        res.send(data);
        
    } catch (e) {
            res.send(e.message)
        }
    
})


module.exports = router;