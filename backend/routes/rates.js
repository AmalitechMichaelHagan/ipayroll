var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function(req, res, next) {
    res.send("rate Dashboard");
});

router.get("/all",async(req,res,next)=>{
try{
const rates = await pool.query("SELECT * FROM rates");
res.json(rates.rows);
}catch(e){
    res.send(e.message)
}

})

router.get("/:id",async(req,res,next)=>{
try{
    const rates = await pool.query("SELECT * FROM rates WHERE id=($1)",[req.params.id]);
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
            const update = await pool.query("UPDATE rates SET salary = $1 WHERE id = $2",
            [salary,id])
            res.send("Salary was updated with value "+salary)
        }catch(e){
            res.send(e.message)
        }

    })   
    
    router.delete("/:id",async(req,res,next)=>{
        try{
            const {id} = req.params;
            const del = await pool.query("DELETE FROM rates where rank = $1",[id])
            res.send("rate was succesfully deleted")
        }catch(e){
            res.send(e.message);
        }

    })

router.post("/send",async(req,res)=>{
    try{
        const {
            rank,
            salary,
            bonus,
            tax_relief,
            income_tax,
            tier_one,
            tier_two,
            loan_deduction
        } = req.body;

        const newRate = await pool.query(`INSERT INTO rates(
            rank,
            salary,
            bonus,
            tax_relief,
            income_tax,
            tier_one,
            tier_two,
            loan_deduction
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`
        ,[ rank,
            salary,
            bonus,
            tax_relief,
            income_tax,
            tier_one,
            tier_two,
            loan_deduction])
    res.json(newRate.rows);        
    }catch(e){
res.send(e.message);
    }
})


module.exports = router;