    const nodemailer = require('nodemailer');
    const {google} = require('googleapis');

    const CLIENT_ID = '161536499376-9cbd1u2mm617trsmudnh3ehpr6koksrq.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04DUgytzR5FcUCgYIARAAGAQSNwF-L9IrOnSjMXkqSSraPE4XLCx2VGg3AiszAs69SgBUHj2hNrHIYY6GPwEIkYu3n0kGqGZ0q-Q';

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    class Tools{
    
      constructor(){

    }

    generatePassword=()=>{

        let constructs = ["abcdefghijklmnopgrstuvwxyz","@#$&[]!?.","0123456789"];
        let user_password = "";

        for(let i = 0; i<8; i++){
        let rand1 = Math.floor(Math.random()*3);
        let holder = constructs[rand1];
        let rand2 = Math.floor(Math.random()*holder.length);
        if(rand1 === 0){
            let rand3 = Math.floor(Math.random()*2);
            rand3 === 0 ? user_password += holder[rand2].toUpperCase() : user_password += holder[rand2].toLowerCase();
        }else{
            user_password += holder[rand2];
        }
        }
    return user_password;
    }

    async sendMail(recipient,subject, message){

        const accessToken = await oAuth2Client.getAccessToken();

        let transporter = nodemailer.createTransport({
          service:'gmail',
          auth: {
            type: 'OAuth2',
            user: 'amalitechipayroll@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
          },
        });
      
        let info = await transporter.sendMail({
          from: `"Amalitech HR" <amalitechipayroll@gmail.com>`,
          to: recipient,
          subject: subject,
          text: message,
          html: "",
        });
      
        console.log("Message sent: %s", info.messageId);
      }


      taxCalc =(
        employee_id,
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
        employerPF)=>{
    
    let ssnit_tear1 = (tear1/100)*base_salary;
    
    let ssnit_tear2 = (tear2/100)*base_salary;
    
    let total_ssnit = ssnit_tear1 + ssnit_tear2;
    
    let pf_employee = (employeePF/100)*base_salary;
    
    let pf_employer = (employerPF/100)*base_salary;
    
    let total_pf = pf_employee+pf_employer;
    
    let amount_taxable = base_salary - (ssnit_tear1 + pf_employee);
    
    amount_taxable -= tax_relief;
    
    amount_taxable += cash_allowance;
    
    var loan_deducted;

    let loan_deductable = (loan_deduction/100)*base_salary;

    if(loan_deductable <= loan_remainder){ 
     loan_deducted = loan_deductable;
     loan_remainder -= loan_deducted;
    }else{
      loan_deducted = loan_remainder;
      loan_remainder = 0;
    }
    
    let cumpaye = 0;
    let rates = [0,5,10,17.5,25,30];
    let income = [365,110,130,3000,16395,20000]
    
    for(let i = 0; i<rates.length; i++){
    
    if(amount_taxable>income[i]){
    cumpaye += (rates[i]/100)*income[i];
    amount_taxable-=income[i];
    
    }else{
    cumpaye += (rates[i]/100)*amount_taxable;
    break;     
    }
    
    }
    
    let total_earnings = base_salary + cash_allowance;
    let total_deductions = cumpaye + ssnit_tear1 + pf_employee + loan_deducted;
    let take_home_salary = total_earnings - total_deductions;
    
    
    
    return {
        "employee_id":employee_id,
        "month":month,
        "year":year,
        "salary":base_salary,
        "cash_allowance":cash_allowance,
        "tax_relief":tax_relief,
        "paye":cumpaye,
        "loan_deduction":loan_deducted,
        "loan_remainder":loan_remainder,
        "ssnit_tier_one":ssnit_tear1,
        "ssnit_tier_two":ssnit_tear2,
        "ssnit_tier_total":total_ssnit,
        "pf_employee":pf_employee,
        "pf_employer":pf_employer,
        "pf_total":total_pf,
        "total_earnings":total_earnings,
        "total_deductions":total_deductions,
        "take_home_salary":take_home_salary
    }
    
    }
    

}

const Tool = new Tools;

module.exports = Tool;