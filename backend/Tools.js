    const nodemailer = require('nodemailer');

    class gen{
    
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
        let transporter = nodemailer.createTransport({
          service:'gmail',
          auth: {
            user: 'amalitechipayroll@gmail.com',
            pass: 'iPayroll123',
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
    

}

const gen1 = new gen;

module.exports = gen1;