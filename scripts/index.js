const buttonSearch = document.querySelector("#page-home main a")
const modal        = document.querySelector("#modal")
const close        = document.querySelector("#modal .header a")

// Se for clicado no botão de pesquisa, faz com que a propriedade que deixa o modal escondido seja removida
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

// Se foi clicado no X, o modal tem a propriedade hide adicionada, o que faz com que ele saia da tela
close.addEventListener("click", () => {
    modal.classList.add("hide")
})