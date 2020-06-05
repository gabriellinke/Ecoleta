const express = require("express")
const server = express()

// Configurar pasta pública
server.use(express.static("public"))


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
    return res.render("create_point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// ligar o servidor
server.listen(3000)