var express = require("express");
var router = express.Router();
const pool = require("../db");

router.get("/", function (req, res, next) {
    res.send("Sign In");
});

router.get("/all", async (req, res, next) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.get("/:id", async (req, res, next) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id=($1)", [req.params.id]);
        res.json(user.rows);
    } catch (e) {
        res.send(e.message)
    }

})

router.put("/update/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let output_str = "";

        let collumns = [
            "email",
            "user_password",
            "admin_role"
        ]

        let check = true; //Will be used to res.send text if invalid or no collumn name is passed

        for (let i = 0; i < collumns.length; i++) {

            if (req.body.hasOwnProperty(collumns[i])) {
                check = false;
                let key = collumns[i]
                const value = req.body[key];
                const update = await pool.query(`UPDATE users SET ${key} = $1 WHERE id = $2`,
                    [value, id]);
                output_str += `User ${key} was updated with value ${value}\n`;
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
        const del = await pool.query("DELETE FROM users where id = $1", [id])
        res.send("User was succesfully deleted")
    } catch (e) {
        res.send(e.message);
    }

})

router.post("/send", async (req, res) => {
    try {
        const {
            email,
            user_password,
            admin_role
        } = req.body;

        const newUser = await pool.query(`INSERT INTO users(
      "email",
      "user_password",
      "admin_role"
    ) VALUES($1,$2,$3) RETURNING *`
            , [email,
                user_password,
                admin_role
            ])


        res.json(newUser.rows);

    } catch (e) {
        res.send(e.message);
    }
})


module.exports = router;