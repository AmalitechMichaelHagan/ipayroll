var express = require("express");
var router = express.Router();
const pool = require("../db");
const xml = require('xml');

router.get("/ssnit", async (req, res, next) => {

    try {

        const { month, year } = req.body;
        var date = '';
        let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
        xml += `<record>`;

        switch (month) {
            case 1: date = `January ${year}`; break;
            case 2: date = `February ${year}`; break;
            case 3: date = `March ${year}`; break;
            case 4: date = `April ${year}`; break;
            case 5: date = `May ${year}`; break;
            case 6: date = `June ${year}`; break;
            case 7: date = `July ${year}`; break;
            case 8: date = `August ${year}`; break;
            case 9: date = `September ${year}`; break;
            case 10: date = `October ${year}`; break;
            case 11: date = `November ${year}`; break;
            case 12: date = `December ${year}`; break;
        }

        let wages = await pool.query(`SELECT employee_id, salary, ssnit_tier_one, ssnit_tier_two, ssnit_tier_total FROM wages WHERE month = ${month} AND year = ${year}`);
        wages = wages.rows;


        for (let i = 0; i < wages.length; i++) {

            let employeedata = await pool.query(`SELECT firstname, surname, ssnit_number, rank FROM employees where id = ${wages[i].employee_id}`);
            employeedata = employeedata.rows[0];

            let rates = await pool.query(`SELECT ssnit_tier_one, ssnit_tier_two FROM rates WHERE rank='${employeedata.rank}'`)
            rates = rates.rows[0];

            xml += `<employee>
                        <date>${date}</date>
                        <ssnitId>${employeedata.ssnit_number}</ssnitId>
                        <firstName>${employeedata.firstname}</firstName>
                        <lastName>${employeedata.surname}</lastName>
                        <salary>${wages[i].salary}</salary>
                        <tearOneRate>${rates.ssnit_tier_one}</tearOneRate>
                        <tearTwoRate>${rates.ssnit_tier_two}</tearTwoRate>
                        <tearOneAmount>${wages[i].ssnit_tier_one}</tearOneAmount>
                        <tearTwoAmount>${wages[i].ssnit_tier_two}</tearTwoAmount>
                        <totalContribution>${wages[i].ssnit_tier_total}</totalContribution>
                    </employee>`

        }



        xml += `</record>`
        console.log(xml)
        res.header('Content-Type', 'application/xml')
        res.status(200).send(xml)

    } catch (e) {
        res.send(e.message)
    }

})


router.get("/gra", async (req, res, next) => {
    try {

        const { month, year } = req.body;
        var date = '';
        let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
        xml += `<record>`;

        switch (month) {
            case 1: date = `January ${year}`; break;
            case 2: date = `February ${year}`; break;
            case 3: date = `March ${year}`; break;
            case 4: date = `April ${year}`; break;
            case 5: date = `May ${year}`; break;
            case 6: date = `June ${year}`; break;
            case 7: date = `July ${year}`; break;
            case 8: date = `August ${year}`; break;
            case 9: date = `September ${year}`; break;
            case 10: date = `October ${year}`; break;
            case 11: date = `November ${year}`; break;
            case 12: date = `December ${year}`; break;
        }

        let wages = await pool.query(`SELECT employee_id, salary, cash_allowance, ssnit_tier_one, pf_employee, tax_relief, paye FROM wages WHERE month = ${month} AND year = ${year}`);
        wages = wages.rows;

        for (let i = 0; i < wages.length; i++) {

            let employeedata = await pool.query(`SELECT firstname, surname, tin_number FROM employees where id = ${wages[i].employee_id}`);
            employeedata = employeedata.rows[0];


            xml += `<employee>
                        <date>${date}</date>
                        <tinNumber>${employeedata.tin_number}</tinNumber>
                        <firstName>${employeedata.firstname}</firstName>
                        <lastName>${employeedata.surname}</lastName>
                        <salary>${wages[i].salary}</salary>
                        <cashAllowance>${wages[i].cash_allowance}</cashAllowance>
                        <ssnitTearOne>${wages[i].ssnit_tier_one}</ssnitTearOne>
                        <providentFund>${wages[i].pf_employee}</providentFund>
                        <taxRelief>${wages[i].tax_relief}</taxRelief>
                        <paye>${wages[i].paye}</paye>
                    </employee>`
        }

        xml += `</record>`
        console.log(xml)
        res.header('Content-Type', 'application/xml')
        res.status(200).send(xml);
    } catch (e) {
        res.send(e.message)
    }

})


module.exports = router;