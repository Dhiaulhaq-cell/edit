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

const question = (question) => { 
  return new Promise((resolve,reject) => { 
    rl.question(question,(input)) 
    resolve(input);
  })
};

const main = async () => { 
  const nama = await question("masukan nama : ")
  const phoneNumber = await question("masukan nomor telepon : ")
  const email = await question("masukan email : ")
}

const contact = { 
  nama,
  phoneNumber,
  email,
};

if (fs.existsSync("data/contacts.json")) { //cek kondisi apakah file tersebut ada di directori
  const readContact = fs.readFileSync("data/contacts.json","utf-8");
  newContact = JSON.parse(readContact);
  } else { // kondisi jika file di direktori tidak ada
    fs.writeFileSync('data/contacts.json'); //membuat file di direktori
    
    rl.close();
  }



main()



    
  
    
    
