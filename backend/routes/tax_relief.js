var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function (req, res, next) {
    res.send("Sign In");
});

router.get("/all", async (req, res, next) => {
    try {
        const tax_reliefs = await pool.query("SELECT * FROM tax_relief");
        res.json(tax_reliefs.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.get("/:id", async (req, res, next) => {
    try {
        const tax_relief = await pool.query("SELECT * FROM tax_relief WHERE id=($1)", [req.params.id]);
        res.json(tax_relief.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "employee_email",
            "tax_relief_type",
            "annual_amomunt",
            "monthly_amount",
            "relief_desc"
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (let i = 0; i < collumns.length; i++) {

            if (req.body.hasOwnProperty(collumns[i])) {
                check = false;
                let key = collumns[i]
                const value = req.body[key];
                const update = await pool.query(`UPDATE tax_relief SET ${key} = $1 WHERE id = $2`,
                    [value, id]);
                output_str += `tax_relief ${key} was updated with value ${value}\n`;
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

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const del = await pool.query("DELETE FROM tax_relief where id = $1", [id])
        res.send("tax_relief was succesfully deleted")
    } catch (e) {
        res.send(e.message);
    }

})

router.post("/send", async (req, res) => {
    try {
        const {
            employee_email,
            tax_relief_type,
            annual_amomunt,
            monthly_amount,
            relief_desc
        } = req.body;

        const newTaxRelief = await pool.query(`INSERT INTO tax_relief(
        "employee_email",
        "tax_relief_type",
        "annual_amomunt",
        "monthly_amount",
        "relief_desc"
    ) VALUES($1,$2,$3,$4,$5) RETURNING *`
            , [employee_email,
                tax_relief_type,
                annual_amomunt,
                monthly_amount,
                relief_desc
            ])


        res.json(newTaxRelief.rows);

    } catch (e) {
        res.send(e.message);
    }
})


module.exports = router;