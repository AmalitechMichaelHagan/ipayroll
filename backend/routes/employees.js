var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function(req, res, next) {
    res.send("Employee Dashboard");
});

router.get("/all",async(req,res,next)=>{
try{
const employees = await pool.query("SELECT * FROM employees");
res.json(employees.rows);
}catch(e){
    res.send(e.message)
}

})

router.get("/:id",async(req,res,next)=>{
try{
    const rates = await pool.query("SELECT * FROM employees WHERE id=($1)",[req.params.id]);
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
            const {firstname} = req.body;
            const update = await pool.query("UPDATE employees SET firstname = $1 WHERE id = $2",
            [firstname,id])
            res.send("Employee name was updated with value "+firstname)
        }catch(e){
            res.send(e.message)
        }

    })   
    
    router.delete("/:id",async(req,res,next)=>{
        try{
            const {id} = req.params;
            const del = await pool.query("DELETE FROM employees where id = $1",[id])
            res.send("Employee was succesfully deleted")
        }catch(e){
            res.send(e.message);
        }

    })

router.post("/send",async(req,res)=>{
    try{
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
            snnit_number,
            loan_status
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
            snnit_number,
            loan_status
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`
        ,[firstname,
            surname,
            date_of_birth,
            gender,
            email,
            department,
            rank,
            phone_number,
            work_start_date,
            snnit_number,
            loan_status])

    res.json(newEmployee.rows);        
    }catch(e){
res.send(e.message);
    }
})


module.exports = router;