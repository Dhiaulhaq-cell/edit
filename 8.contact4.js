const func = require("./src/func.js");
const validator = require('validator');

const main = async () => { 
    
    do {
        nama = await func.question("masukan nama : ") 
        
      } while (!validator.isAlpha(nama));
    do {
        phoneNumber = await func.question("masukan nomor telepon : ") 
        
      } while (!validator.isMobilePhone(phoneNumber, "id-ID")); // Loop akan terus berjalan jika email tidak valid
      
      do {
        email = await func.question("masukan email : ") 
        
      } while (!validator.isEmail(email));
    

  
  const data = { 
    nama,
    phoneNumber,
    email,
  };

  func.addContact(data);
  func.rl.close();

};

main();