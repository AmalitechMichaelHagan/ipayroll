var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function(req, res, next) {
    res.send("loan Dashboard");
});

router.get("/all",async(req,res,next)=>{
try{
const loans = await pool.query("SELECT * FROM loans");
res.json(loans.rows);
}catch(e){
    res.send(e.message)
}

})

router.get("/:id",async(req,res,next)=>{
try{
    const rates = await pool.query("SELECT * FROM loans WHERE id=($1)",[req.params.id]);
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
            const {amount_left} = req.body;
            const update = await pool.query("UPDATE loans SET amount_left = $1 WHERE id = $2",
            [amount_left,id])
            res.send("Amount left was updated with value "+amount_left)
        }catch(e){
            res.send(e.message)
        }

    })   
    
    router.delete("/:id",async(req,res,next)=>{
        try{
            const {id} = req.params;
            const del = await pool.query("DELETE FROM loans where id = $1",[id])
            res.send("loan was succesfully deleted")
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
        ,[  
            employee_id,
            month,
            year,
            initial_amount,
            amount_left
        ])

    res.json(newLoan.rows);        
    }catch(e){
res.send(e.message);
    }
})


module.exports = router;