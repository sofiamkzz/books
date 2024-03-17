const express = require('express');
const app = express();

// Configurando EJS como view engine
app.set('view engine', 'ejs');

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Middleware que serve os arquivos estáticos para o Express
app.use(express.static('public'));

// Array de objetos representando o banco de dados de livros
let books = [
    { id: 412, title: "A HORA DA ESTRELA", author: "CLARICE LISPECTOR", year: 1977 },
    { id: 973, title: "IGUALDADE", author: "NICOLAS PEIXOTO", year: 1977 },
    { id: 522, title: "CIDADES DE PAPEL", author: "JOHN GREEN", year: 2008 },
    { id: 370, title: "DOM CASMURRO", author: "MACHADO DE ASSIS", year: 1899 },
    { id: 419, title: "JUDY MOODY", author: "MEGAN MCDONALD", year: 2002 },
    { id: 155, title: "VIDAS SECAS", author: "GRACILIANO RAMOS", year: 1938 },
    { id: 510, title: "LEVIATÃ", author: "THOMAS HOBBES", year: 1651 },
    { id: 922, title: "É ASSIM QUE ACABA", author: "COLLEEN HOOVER", year: 2016 },
    { id: 790, title: "ROMEU E JULIETA", author: "WILLIAM SHAKESPEARE", year: 1597 },
    { id: 749, title: "DIÁRIO DE ANNE FRANK", author: "ANNE FRANK", year: 1947 },
    { id: 138, title: "ORGULHO E PRECONCEITO", author: "JANE AUSTEN", year: 1813 },
];

// Rota para renderizar a página inicial
app.get('/', (req, res) => {
    res.render('index', { books });
});

// Rota para exibir informações sobre um livro por ano a partir do parâmetro URL
app.get('/search/:year', (req, res) => {
    let byear = req.params.year;
    let booksByYear = books.filter(book => book.year == byear);
    res.render('index', { books: booksByYear });
});

// Rota para pesquisar livros com base no título da string de consulta
app.get('/search', (req, res) => {
    let title = req.query.title || '';
    let booksByTitle = books.filter(book => book.title == title.toUpperCase()); 
    res.render('index', { books: booksByTitle });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});