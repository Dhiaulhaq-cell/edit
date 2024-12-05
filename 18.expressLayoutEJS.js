const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fs = require ('fs');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Static files
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', name: "goku" });
});

app.get('/about', (req, res) => {
    res.render('about2', { title: 'About Us', name: "goku"  });
});

app.get('/contact', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'contact.html'));
    const cont = JSON.parse(fs.readFileSync("data/contacts.json", "utf-8"));//mengambil data dari json dan diparsing
    
    res.render("contact2", {cont, title: "contact"})//mengekspor data ke folder views/contact dan variabel cont
})
// Start server
const PORT = 2000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))