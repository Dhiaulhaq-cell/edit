//memasukan module validator
const validator = require('validator')
const readline = require('node:readline');
const { default: isEmail } = require('validator/lib/isEmail');
const fs = require ('fs');
const { log } = require('node:console');


//membuat interface kedalam 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
//membuat pertanyaan nama

rl.question('Apa nama kamu? ', (nama) => {
    console.log(`Nama kamu: ${nama}`);
//membuat pertanyaan nomor telepon
 
    rl.question('Berapa nomor kamu? ', (phoneNumber) => {
        if (validator.isMobilePhone(phoneNumber, "id-ID")) {
            console.log(`${phoneNumber} adalah nomor telepon yang valid.`);//validasi nomor telepon
          } else {
            console.log(`${phoneNumber} bukan nomor telepon yang valid.`);  
          }; 
    
             rl.question('Apa email kamu? ', (email) => { //membuat pertanyaan email
                if (validator.isEmail(email)) {
                     console.log(`email kamu: ${email}`) // membuat validasi email
                } 
                else {
            console.log(`email tidak valid`)
          };
        
          const data = { //membuat sebuah data yang dengan format sesuai dengan data yang di input
            nama, 
            phoneNumber,
            email
          };
          
          var newContact = []; // membuat array kosong untuk dimasukan data
         
         
          if (fs.existsSync("data/contacts.json")) { //cek kondisi apakah file tersebut ada di directori
          const readContact = fs.readFileSync("data/contacts.json","utf-8");
          newContact = JSON.parse(readContact);
          } else { // kondisi jika file di direktori tidak ada
            fs.writeFileSync('data/contacts.json'); //membuat file di direktori

          }
         
        
          newContact.push(data); //menambh data di array
          
          fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8");//memasukan data ke direktori
           
          // Menutup readline setelah semua pertanyaan selesai
          rl.close();
        });
      });
    });

    
  
    
    
