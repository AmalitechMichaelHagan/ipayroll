var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function(req, res, next) {
    res.send("wage Dashboard");
});

router.get("/all",async(req,res,next)=>{
try{
const wages = await pool.query("SELECT * FROM wages");
res.json(wages.rows);
}catch(e){
    res.send(e.message)
}

})

router.get("/:id",async(req,res,next)=>{
try{
    const rates = await pool.query("SELECT * FROM wages WHERE id=($1)",[req.params.id]);
    res.json(rates.rows);
}catch(e){
    res.send(e.message)
    }
        
})

router.put("/:id",async(req,res,next)=>{
    try{
            const {id} = req.params;
            /*
            Figure out a way to check if the body has any of the table
            collumn names then use that to update in multiple if statements
            rather them creating a route for each table collumn. 
            Try using .include to check. 
            */
            const {salary} = req.body;
            const update = await pool.query("UPDATE wages SET salary = $1 WHERE id = $2",
            [salary,id])
            res.send("Salary was updated with value "+salary)
        }catch(e){
            res.send(e.message)
        }

    })   
    
    router.delete("/:id",async(req,res,next)=>{
        try{
            const {id} = req.params;
            const del = await pool.query("DELETE FROM wages where id = $1",[id])
            res.send("wage was succesfully deleted")
        }catch(e){
            res.send(e.message);
        }

    })

router.post("/send",async(req,res)=>{
    try{
        const {
            employee_id,
            month,
            year,
            salary,
            bonus,
            tax_relief,
            income_tax,
            loan_deduction,
            loan_remainder,
            tier_one,
            tier_two,
            total_earnings,
            total_deductions,
            total_tiers,
            net_salary
            } = req.body;

        const newWage = await pool.query(`INSERT INTO wages(
            employee_id,
            month,
            year,
            salary,
            bonus,
            tax_relief,
            income_tax,
            loan_deduction,
            loan_remainder,
            tier_one,
            tier_two,
            total_earnings,
            total_deductions,
            total_tiers,
            net_salary
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`
        ,[  employee_id,
            month,
            year,
            salary,
            bonus,
            tax_relief,
            income_tax,
            loan_deduction,
            loan_remainder,
            tier_one,
            tier_two,
            total_earnings,
            total_deductions,
            total_tiers,
            net_salary])

    res.json(newWage.rows);        
    }catch(e){
res.send(e.message);
    }
})


module.exports = router;