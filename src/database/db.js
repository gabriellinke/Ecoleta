// importar a dependência do SQLITE3
const sqlite3 = require("sqlite3").verbose()

// iniciar o objeto de db   (vai fazer as operações)
const db = new sqlite3.Database("./src/database/database.db")

// Permite usar em outros lugares do programa - Permite o require
module.exports = db

// utilizar o objeto de db para operações
 db.serialize( () => {
//     //Criar uma tabela com comandos SQL
//     db.run(` 
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT, 
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // // Inserir dados
//     const query = `
//         INSERT INTO places(
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?, ?, ?, ?, ?, ?, ?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papel e Papelão"
//     ]

//     // // Tratar caso apareça algum erro, ou outra coisa
//     function afterInsertData(err)
//     {
//         if(err){
//             return console.log(err);
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     // // Lugar em que vai inserir, o que vai inserir, o que fazer depois da inserção
//     db.run(query, values, afterInsertData)
    
//     // Consultar dados
//     // * usado para selecionar todos itens da tabela 

//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err){
//             return console.log(err);
//         }

//         console.log("Registros:")
//         console.log(rows)
//     })

//     // Deletar tabela
//     // db.run(`DROP TABLE IF EXISTS tableName`)

//     // Deletar
        // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        //     if(err){
        //         return console.log(err);
        //     }

        //     console.log("Registro deletado com sucesso")
        // })

})