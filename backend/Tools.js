const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const excelJS = require("exceljs");


const CLIENT_ID = '161536499376-9cbd1u2mm617trsmudnh3ehpr6koksrq.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04DUgytzR5FcUCgYIARAAGAQSNwF-L9IrOnSjMXkqSSraPE4XLCx2VGg3AiszAs69SgBUHj2hNrHIYY6GPwEIkYu3n0kGqGZ0q-Q';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

class Tools {

  constructor() {

  }

  generatePassword = () => {

    let constructs = ["abcdefghijklmnopgrstuvwxyz", "@#$&[]!?.", "0123456789"];
    let user_password = "";

    for (let i = 0; i < 8; i++) {
      let rand1 = Math.floor(Math.random() * 3);
      let holder = constructs[rand1];
      let rand2 = Math.floor(Math.random() * holder.length);
      if (rand1 === 0) {
        let rand3 = Math.floor(Math.random() * 2);
        rand3 === 0 ? user_password += holder[rand2].toUpperCase() : user_password += holder[rand2].toLowerCase();
      } else {
        user_password += holder[rand2];
      }
    }
    return user_password;
  }

  async sendMail(recipient, subject, message, attachments = false) {
   try{ 
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'amalitechipayroll@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    if(attachments){
    let info = await transporter.sendMail({
      from: `"Amalitech HR" <amalitechipayroll@gmail.com>`,
      to: recipient,
      subject: subject,
      text: message,
      html: "",
      attachments: [
        {
          filename: attachments.filename,    
          path: attachments.path
        },
      ]
    });
  }else{
    let info = await transporter.sendMail({
      from: `"Amalitech HR" <amalitechipayroll@gmail.com>`,
      to: recipient,
      subject: subject,
      text: message,
      html: ""
    });

  }
    console.log("Message sent: %s", info.messageId);
  }catch(e){
    console.log(e.message);
  }
  }


  taxCalc = (
    employee_id,
    firstname,
    surname,
    department,
    ssnit,
    rank,
    month,
    year,
    base_salary,
    cash_allowance,
    tax_relief,
    loan_deduction,
    loan_remainder,
    tear1,
    tear2,
    employeePF,
    employerPF) => {
     
    let full_name = `${firstname} ${surname}`;

    let date = '';

    let ssnit_tear1 = (tear1 / 100) * base_salary;

    let ssnit_tear2 = (tear2 / 100) * base_salary;

    let total_ssnit = ssnit_tear1 + ssnit_tear2;

    let pf_employee = (employeePF / 100) * base_salary;

    let pf_employer = (employerPF / 100) * base_salary;

    let total_pf = pf_employee + pf_employer;

    let amount_taxable = base_salary - (ssnit_tear1 + pf_employee);

    amount_taxable -= tax_relief;

    amount_taxable += cash_allowance;

    var loan_deducted;

    let loan_deductable = (loan_deduction / 100) * base_salary;

    if (loan_deductable <= loan_remainder) {
      loan_deducted = loan_deductable;
      loan_remainder -= loan_deducted;
    } else {
      loan_deducted = loan_remainder;
      loan_remainder = 0;
    }

    let cumpaye = 0;
    let rates = [0, 5, 10, 17.5, 25, 30];
    let income = [365, 110, 130, 3000, 16395, 20000]

    for (let i = 0; i < rates.length; i++) {

      if (amount_taxable > income[i]) {
        cumpaye += (rates[i] / 100) * income[i];
        amount_taxable -= income[i];

      } else {
        cumpaye += (rates[i] / 100) * amount_taxable;
        break;
      }

    }

    let total_earnings = base_salary + cash_allowance;
    let total_deductions = cumpaye + ssnit_tear1 + pf_employee + loan_deducted;
    let take_home_salary = total_earnings - total_deductions;

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



    return {
      "employee_id": employee_id,
      "month": month,
      "year": year,
      "salary": base_salary,
      "cash_allowance": cash_allowance.toFixed(2)*1,
      "tax_relief": tax_relief,
      "paye": cumpaye.toFixed(2)*1,
      "loan_deduction": loan_deducted.toFixed(2)*1,
      "loan_remainder": loan_remainder,
      "ssnit_tier_one": ssnit_tear1.toFixed(2)*1,
      "ssnit_tier_two": ssnit_tear2.toFixed(2)*1,
      "ssnit_tier_total": total_ssnit.toFixed(2)*1,
      "pf_employee": pf_employee.toFixed(2)*1,
      "pf_employer": pf_employer.toFixed(2)*1,
      "pf_total": total_pf.toFixed(2)*1,
      "total_earnings": total_earnings.toFixed(2)*1,
      "total_deductions": total_deductions.toFixed(2)*1,
      "take_home_salary": take_home_salary.toFixed(2)*1,
      "full_name":full_name,
      "date":date,
      "department":department,
      "ssnit_number":ssnit,
      "rank":rank
    }

  }

  async compile(data){
    const filePath = path.join(process.cwd(), 'Payslips/template', `Payslip.hbs`)
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
    
    }
    
    async pdfgen(data){
        
        const result = await this.compile(data);
    
        try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        await page.addStyleTag({url:'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css'});
        await page.addStyleTag({url:'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css'});
        await page.setContent(result);
        await page.emulateMediaType('screen');
        await page.pdf({
        path: `Payslips/${data.employee_id}_${data.month}_${data.year}.pdf`, //Define where you want files to be stored.
        format: 'A4',
        printBackground: true
        });
    
        console.log('done');
        await browser.close();
    
        }catch(e){
            console.log(e);
        }
    }

    async reportgen(data){

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1"); // New Worksheet
        const path = "./Reports";  // Path to download excel
        
      let columns = [];
      let keys = Object.keys(data[0]);

      keys.forEach((col) => {
        columns.push({
          header:col,
          key:col,
          with:20
        }) // Add data in worksheet
      });

      worksheet.columns = columns;

      data.forEach((row) => {
        worksheet.addRow(row); // Add data in worksheet
      });
      
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      
      
      
      const data2 = await workbook.xlsx.writeFile(`${path}/report.xlsx`);
 
      return `${path}/report.xlsx`;


    }


  }

const Tool = new Tools;

module.exports = Tool;