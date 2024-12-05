//menginput modul di
const readline = require('node:readline');
const validator = require('validator');
const ac = new AbortController();
const signal = ac.signal;
//membuat interface agar bisa menampilkan input di cli
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//membuat pertanyaan yg ditanyakan pada user 

    rl.question('Apa nama kamu? ', (nama) => {
    console.log(`Nama kamu: ${nama}`);
    if (condition) {
      
    }
    rl.question('Berapa nomor kamu? ', (noTelp) => {
    console.log(`noTelp kamu: ${noTelp}`);
        
    rl.question('Apa email kamu? ', (email) => {
    console.log(`Hobi kamu: ${email}`);
          
// Menutup readline setelah semua pertanyaan selesai
          rl.close();
        });
      });
    });


