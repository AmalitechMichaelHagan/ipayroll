var express = require("express");
var router = express.Router();
const pool = require("../db");



/**
 * @swagger
 *components:
 *  schemas:
 *    Rate:
 *      type: object
 *        properties:
 *          id:
 *              type: integer
 *              format:int64
 *              description: The auto generated ID for a rate
 *          rank:    
 *               type: integer
 *               format:int64
 *               description: The rank of the employee corresponding to how much he earns, and his deduction rates.
 *          salary:    
 *               type: number
 *               format:double
 *               description: How much the employee earns in a month
 *          cash_allowance:  
 *               type: number
 *               format:double
 *               description: Cash allowance for a given month
 *          pf_employee:    
 *               type: number
 *               format:float
 *               description: Rate deducted for provident fund contribution from employee salary
 *          pf_employer:    
 *               type: number
 *               format:float
 *               description: Rate payed by employer as provident fund calculated with respect to employee salary but is not deducted from salary
 *          ssnit_tier_one:    
 *               type: number
 *               format:float
 *               description: Rate deducted for ssnit contribution from employee salary
 *          ssnit_tier_two:    
 *               type: number
 *               format:float
 *               description: Rate payed by employer as ssnit calculated with respect to employee salary but is not deducted from salary
 *          example:
 *               id: 2
 *               rank: Level3
 *               salary: 20000
 *               cash_allowance: 1500
 *               pf_employee: 6.0
 *               pf_employer: 10.5
 *               ssnit_tier_one: 5.5
 *               ssnit_tier_two: 13.5
 *
 */



/**
 * @swagger
 * /rates:
 *  get: 
 *      summary:tt
 *      responses:
 *          200:
 *             descripption: tt
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:array
 *                             items:
 *                              $ref: '#/components/schemas/Rate'
 *                              
 * 
 * */   

router.get("/", function (req, res, next) {
    res.send("rate Dashboard");
});

router.get("/all", async (req, res, next) => {
    try {
        const rates = await pool.query("SELECT * FROM rates");
        res.json(rates.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.get("/:id", async (req, res, next) => {
    try {
        const rates = await pool.query("SELECT * FROM rates WHERE id=($1)", [req.params.id]);
        res.json(rates.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.put("/update/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
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

        for (let i = 0; i < collumns.length; i++) {

            if (req.body.hasOwnProperty(collumns[i])) {
                check = false;
                let key = collumns[i]
                const value = req.body[key];
                const update = await pool.query(`UPDATE rates SET ${key} = $1 WHERE id = $2`,
                    [value, id]);
                output_str += `Rate ${key} was updated with value ${value}\n`;
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
        const del = await pool.query("DELETE FROM rates where rank = $1", [id])
        res.send("rate was succesfully deleted")
    } catch (e) {
        res.send(e.message);
    }

})

router.post("/send", async (req, res) => {
    try {
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
            ssnit_tier_two
        ) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`
            , [
                rank,
                salary,
                cash_allowance,
                pf_employee,
                pf_employer,
                ssnit_tier_one,
                ssnit_tier_two
            ])
        res.json(newRate.rows);
    } catch (e) {
        res.send(e.message);
    }
})


module.exports = router;