const validator = require('validator');
const readline = require('node:readline');
const fs = require ('fs');


 
    const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout,
        });



const question = (question) => { 
    return new Promise((resolve,reject) => { 
      rl.question(question,(input)=> {
      resolve(input);
      })
    }) 
  };

  function addContact(data) {
  if (fs.existsSync("data/contacts.json")) { //cek kondisi apakah file tersebut ada di directori
    const readContact = fs.readFileSync("data/contacts.json","utf-8");
    newContact = JSON.parse(readContact);
    } else { // kondisi jika file di direktori tidak ada
      fs.writeFileSync('data/contacts.json'); //membuat file di direktori
    } 
    newContact.push(data);
    fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8");

}
//membuat fungsi delete contak 
function deleteContact(argv) { 
 const data = JSON.parse(fs.readFileSync("data/contacts.json","utf-8")) //membaca data dari folder untuk diambil dan diproses
  const newContact = data.filter((datas)=> datas.name.toLowerCase() !== argv.name.toLowerCase()) //membuat filter dan mengecualikan data yg ditulis di yargs

  fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8"); //replace data yang di input lalu dimasukan data yang baru
 
}
// function closeReadline() {
//     rl.close();
//     console.log('Interface readline ditutup.');
// }

// fungsi untuk menampilkan data
function tampilkanKontak() { 
  const readContact = JSON.parse(fs.readFileSync("data/contacts.json","utf-8"));
  Object.keys(readContact).forEach(key => {
    console.log(`${key}: ${JSON.stringify(readContact[key], null, 2)}`);
  });
};

// function detailKontak() {
//       // Membaca isi dari package.json
//     const listContact = JSON.parse(fs.readFileSync('data/contacts.json', 'utf8'));
//     // Memastikan kontak ada dalam package.json
//     if (listContact.name) {
//       console.log(`Nama Kontak: ${listContact.name}`);
//     } else {
//       console.log("not found");
//     }
//   }
    
// function detailKontak() {
//   try {
//     // Membaca isi dari package.json
//     const packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'));

//     // Memeriksa apakah data kontak ada
//     if (packageData && Array.isArray(packageData)) {
//       console.log("Daftar Kontak:");
//       packageData.contacts.forEach((kontak, index) => {
//         // Menampilkan detail setiap kontak
//         console.log(`\nKontak ${index + 1}:`);
//         console.log(`Nama: ${kontak.name || 'Tidak tersedia'}`);
//         console.log(`Email: ${kontak.mobile || 'Tidak tersedia'}`);
//         console.log(`Telepon: ${kontak.email|| 'Tidak tersedia'}`);
//       });
//     } else {
//       console.log("Tidak ditemukan informasi kontak dalam package.json.");
//     }
//   } catch (error) {
//     console.error("Terjadi kesalahan dalam membaca package.json:", error.message);
//   }
// }
//funsi untuk menampilkan detail semua kontak
function detailKontak(argv) {
  try {
    // Membaca isi dari contacts.json
    const data = JSON.parse(fs.readFileSync('data/contacts.json', 'utf8'));

    // Mencari kontak berdasarkan nama yang diberikan
    const namaKontak = argv.name;
    const kontak = data.find(c => c.name.toLowerCase() === namaKontak.toLowerCase());

    // Jika kontak ditemukan, tampilkan detailnya
    if (kontak) {
      console.log(`Detail Kontak:`);
      console.log(`Nama: ${kontak.name}`);
      console.log(`Mobile: ${kontak.mobile}`);
      console.log(`Email: ${kontak.email}`);
    } else {
      console.log(`Kontak dengan nama "${namaKontak}" tidak ditemukan.`);
    }
  } catch (error) {
    console.error("Terjadi kesalahan dalam membaca contacts.json:", error.message);
  }
}
//fungsi untuk mengupdate kontak
function ubahKontak(argv,data) { 
  const readContact = JSON.parse(fs.readFileSync('data/contacts.json', 'utf8')); 
  const newContact = readContact.filter((data)=> data.name.toLowerCase() !== argv.name.toLowerCase())

  if (readContact.length === newContact.length) {
    console.log("not found");
    
  } else { 
    newContact.push(data);
    fs.writeFileSync('data/contacts.json',JSON.stringify(newContact,null, 2), "utf-8");
  }
}

// function cekContacts(argv,data) { 
//   const readContact = JSON.parse (fs.readFileSync("data/contacts.json","utf-8"));
//   const searchContact = readContact.filter((data)=> data.name === argv.name)
//   // newContact.push(data);
//    if (searchContact) {
//     console.log("kontak tersebut sudah ada ");
//    } else { 
//     readContact.push(data);
//     fs.writeFileSync('data/contacts.json',JSON.stringify(readContact,null, 2), "utf-8");
//    } 
// }

function cekContacts(argv, data) {
  // Membaca file contacts.json
  const readContact = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));
  
  // Mencari apakah kontak dengan nama yang sama sudah ada
  const searchContact = readContact.filter((contact) => 
    contact.name.toLowerCase() === argv.name.toLowerCase()
  );

  // Jika searchContact memiliki panjang lebih dari 0, berarti sudah ada
  if (searchContact.length > 0) {
    console.log("Kontak tersebut sudah ada.");
  } else {
    // Jika tidak ada, tambahkan kontak baru
    readContact.push(data);
    // Menyimpan data kontak yang telah diperbarui ke dalam file JSON
    fs.writeFileSync("data/contacts.json", JSON.stringify(readContact, null, 2), "utf-8");
    console.log("Kontak berhasil ditambahkan.");
  }
}
 
function deleteContact2(identifier) {
  // Baca data kontak dari file JSON
  let contacts = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));

  // Filter kontak yang tidak cocok dengan identifier (kontak yang dihapus akan dilewati)
  const filteredContacts = contacts.filter(contact => contact.name !== identifier);

  // Tulis kembali data yang telah difilter ke file JSON
  fs.writeFileSync("data/contacts.json", JSON.stringify(filteredContacts, null, 2));

  return filteredContacts.length !== contacts.length; // Mengembalikan true jika ada kontak yang dihapus
}

function addContact2(data) {
  let newContact = [];

  // Cek apakah file contacts.json ada di direktori
  if (fs.existsSync("data/contacts.json")) {
    // Membaca file JSON jika file ada
    const readContact = fs.readFileSync("data/contacts.json", "utf-8");
    newContact = JSON.parse(readContact); // Parse data JSON menjadi array
  } else {
    // Jika file tidak ada, buat file contacts.json baru dengan array kosong
    fs.writeFileSync('data/contacts.json', JSON.stringify([], null, 2), "utf-8");
  }

  // Cek apakah nama kontak sudah ada di dalam array
  const existingContact = newContact.find(c => c.name === data.name);

  if (existingContact) {
    // Jika nama kontak sudah ada, lemparkan error
    throw new Error('Nama kontak sudah ada.');
  }

  // Jika nama belum ada, tambahkan kontak baru ke array
  newContact.push(data);

  // Tulis kembali data kontak ke dalam file contacts.json
  fs.writeFileSync('data/contacts.json', JSON.stringify(newContact, null, 2), "utf-8");
}

function editContact2(identifier, updatedData) {
  // Baca semua kontak dari file JSON
  let contacts = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));

  // Cari indeks kontak yang akan diupdate
  const contactIndex = contacts.findIndex(contact => contact.name === identifier);

  const existingContact = contacts.find(c => c.name === updatedData.name);

  if (existingContact) {
    // Jika nama kontak sudah ada, lemparkan error
    throw new Error('Nama kontak sudah ada.');
  }

  if (contactIndex !== -1) {
 
    // Tulis kembali data kontak ke dalam file contacts.json
      // Update kontak dengan data baru
      contacts[contactIndex] = { ...contacts[contactIndex], ...updatedData };

      // Simpan kembali data ke file JSON
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));

      return true; // Berhasil diupdate
  }

  return false; // Kontak tidak ditemukan
}


// Memanggil fungsi dengan parameter yang diterima dari command line
// if (argv._[0] === 'ubah') {
//   const { name, mobile, email } = argv;
//   ubahKontak(name, mobile, email);
// }

    module.exports = {rl,question,addContact,deleteContact,tampilkanKontak,detailKontak,ubahKontak,cekContacts,deleteContact2,addContact2,editContact2};
  
