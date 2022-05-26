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
        let output_str = ""; 

       let collumns = [
            "rank",
            "salary",
            "cash_allowance",
            "pf_employee",
            "pf_employer",
            "ssnit_tier_one",
            "ssnit_tier_two"
    ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for(let i=0;i<collumns.length;i++){
            
        if(req.body.hasOwnProperty(collumns[i])){
            check = false;
            let key = collumns[i]
            const  value = req.body[key];
            const update = await pool.query(`UPDATE rates SET ${key} = $1 WHERE id = $2`,
        [value,id]);
        output_str+=`Rate ${key} was updated with value ${value}\n`;
        }
        }

        if(check){
        res.send("Attribute passed does not exist or null attribute passed")
        }else{
        res.send(output_str);    
        }
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
            cash_allowance,
            pf_employee,
            pf_employer,
            ssnit_tier_one,
            ssnit_tier_two
        } = req.body;

        const newRate = await pool.query(`INSERT INTO rates(
            rank,
            salary,
            cash_allowance,
            pf_employee,
            pf_employer,
            ssnit_tier_one,
            ssnit_tier_two,
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`
        ,[ 
            rank,
            salary,
            cash_allowance,
            pf_employee,
            pf_employer,
            ssnit_tier_one,
            ssnit_tier_two,
        ])
    res.json(newRate.rows);        
    }catch(e){
res.send(e.message);
    }
})


module.exports = router;