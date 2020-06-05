const express = require("express")
const server = express()

// Pegar o DB
const db = require("./database/db")

// Configurar pasta pública
server.use(express.static("public"))

// Habilitar o uso do req.body 
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
// Enquanto estiver desenvolvendo deixa sem cache, para nao ter problemas
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da minhas aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa URL - usando POST não vai usar a req.query, porque não vai passar pela url
    // console.log(req.query)

    return res.render("create_point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body = o corpo do nosso formulário

    // Inserir dados no DB
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    // // Tratar caso apareça algum erro, ou outra coisa
    function afterInsertData(err)
    {
        if(err){
            console.log(err);
            //Criar uma modal de erro, que depois volta para a create point
            return res.render("create_point.html", {error: true})
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create_point.html", {saved: true})
    }

    // // Lugar em que vai inserir, o que vai inserir, o que fazer depois da inserção
    db.run(query, values, afterInsertData)
})

//Botão de pesquisa vai mandar um /search
server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "")
    {
        return res.render("search-results.html", { total: 0})
    }

    // Pegar os dados do DB
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            console.log(err);
            return res.render("index.html", {error: true})
        }

        const total = rows.length

        //Mostrar a página HTML com os dados do DB
        return res.render("search-results.html", {places: rows, total: total})
    })
})


// ligar o servidor
server.listen(3000)