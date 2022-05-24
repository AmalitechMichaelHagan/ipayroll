    const nodemailer = require('nodemailer');
    const {google} = require('googleapis');

    const CLIENT_ID = '161536499376-9cbd1u2mm617trsmudnh3ehpr6koksrq.apps.googleusercontent.com';
    const CLIENT_SECRET = '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';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04IhJ8yr6IZfdCgYIARAAGAQSNwF-L9IrYtRA299xC46X366nRrlz6mPQXpDRC6rqx40-tEgUc-Ww-OWIGdEihWdvMWKdjgxNX8g';

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

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
    

}

const gen1 = new gen;

module.exports = gen1;