const { name } = require('ejs');
const express = require('express')
const app = express()
const path = require('path');
const fs = require ('fs');
const { title } = require('process');
const func = require("./src/func.js");
const validator = require('validator')




app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    const name = "goku";
    res.render("index", {name})
})
app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'about.html'));
    
    res.render("about");
})
app.get('/contact', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'contact.html'));
    const cont = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));//mengambil data dari json dan diparsing
    
    res.render("contact", {cont})//mengekspor data ke folder views/contact dan variabel cont
})

// Render the addcontact page
app.get('/addcontact', (req, res) => {
    res.render("addcontact");
});

// Handle the POST request to add a contact
app.post('/tambahcontact', (req, res) => {
    const { name, email, mobile } = req.body;

    // Validasi sederhana
    if (!name || !email || !mobile) {
        return res.status(400).send('Semua field harus diisi.');
    }
    if (!validator.isMobilePhone(mobile, 'id-ID')) {
        return res.status(400).send('Nomor telepon tidak valid. Pastikan nomor telepon Indonesia yang benar.');
    }
    try {
        // Coba tambahkan kontak baru
        func.addContact2(req.body);
        // Redirect kembali ke halaman kontak
        res.redirect('/contact');
    } catch (error) {
        // Jika error terjadi (misalnya nama sudah ada), kirim pesan error dan kembali ke halaman tambah kontak
        return res.status(400).send('Gagal menambahkan kontak: ' + error.message);
    }
    // func.addContact2(req.body);
    // // Redirect kembali ke halaman kontak
    // res.redirect('/contact');
});

app.get('/deletecontact/:name', (req, res) => {
    const name = req.params.name; // Ambil nama dari URL

    // Gunakan fungsi deleteContact dari func.js
    const isDeleted = func.deleteContact2(name);

    if (isDeleted) {
        res.redirect('/contact'); // Redirect ke halaman kontak setelah penghapusan
    } else {
        res.status(404).send('Kontak tidak ditemukan.');
    }
});

app.get('/editcontact/:name', (req, res) => {
    const name = req.params.name; // Ambil parameter `name`

    // Baca data kontak dari JSON
    const contacts = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));

    // Cari kontak berdasarkan `name`
    const contact = contacts.find(c => c.name === name);

    if (contact) {
        res.render("editcontact", { contact }); // Kirim data kontak ke template edit
    } else {
        res.status(404).send('Kontak tidak ditemukan.');
    }
});

// app.post('/editcontact/:name', (req, res) => {
//     const oldName = req.params.name; // Nama lama sebagai identifier
//     const { name, email, mobile } = req.body; // Data baru dari form

//     const isUpdated = func.editContact2(oldName, { name, email, mobile });


//     if (isUpdated) {
//         res.redirect('/contact'); // Redirect ke daftar kontak setelah berhasil
//     } else {
//         res.status(404).send('Gagal memperbarui kontak.');
//     }
// });

app.post('/editcontact/:name', (req, res) => {
    const oldName = req.params.name; // Nama lama sebagai identifier
    const { name, email, mobile } = req.body; // Data baru dari form

    // const isUpdated = func.editContact2(oldName, { name, email, mobile });


    // if (isUpdated) {
    //     res.redirect('/contact'); // Redirect ke daftar kontak setelah berhasil
    // } else {
    //     res.status(404).send('Gagal memperbarui kontak.');
    // }
    if (!name || !email || !mobile) {
        return res.status(400).send('Semua field harus diisi.');
    }
    if (!validator.isMobilePhone(mobile, 'id-ID')) {
        return res.status(400).send('Nomor telepon tidak valid. Pastikan nomor telepon Indonesia yang benar.');
    }
    try {
        func.editContact2(oldName, { name, email, mobile });
        res.redirect('/contact'); 
    } catch (error) {
        return res.status(400).send('Gagal edit kontak: ' + error.message);
        
    }
});

app.get('/contact/:name', (req, res) => {
    const name = req.params.name; // Mengambil parameter `name` dari URL

    // Baca data kontak dari file JSON
    const contacts = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));

    // Cari kontak berdasarkan `name`
    const contact = contacts.find(c => c.name === name);

    if (contact) {
        res.render("details", { contact }); // Render halaman detail.ejs dengan data kontak
    } else {
        res.status(404).send('Kontak tidak ditemukan.');
    }
});

app.use((req,res)=> { 
    res.status(404).send("404 : Not found")
})

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})