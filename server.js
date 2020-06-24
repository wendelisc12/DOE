//configurando servidor
const express = require("express")
const server = express()

//configurar servidor para mostrar arquivos extras
server.use(express.static('public'))

//para usar o body no express
server.use(express.urlencoded({ extended: true }))


//configurando o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express:server,
    noCache:true,
})

//Lista de doadores em array
const doadores=[
    {
        name: "Wendel Isaac",
        sangue: "O+"
    },
    
    {
        name: "Bob Bibiano",
        sangue: "AB+"
    },

    {
        name: "Lia Lopes",
        sangue: "O-"
    },

    {
        name: "Jadielma Lopes",
        sangue: "AB-"
    }
]

//configurar a apresentação da pagina
server.get("/", function(req,res){
    return res.render("index.html", {doadores})
})

//pegando dados
server.post("/", function(req, res){
    //pegando dados do formulario
    const name = req.body.name
    const email = req.body.email
    const sangue = req.body.sangue

    //colocando valores dentro do array
    doadores.push({
        name: name,
        sangue: sangue,
    })

    //a resposta
    return res.redirect("/")
})

//ligar o servidor e liberar acesso a porta 3000
server.listen(3000, function(){
    console.log("starting server")
})

