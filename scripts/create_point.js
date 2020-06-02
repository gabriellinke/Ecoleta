// faz aparecer os estados na lista de estados
function populateUFs()
{
    // Seleciona o select de nome uf, que no caso é o que disponibiliza a escolha de estados
    const ufSelect = document.querySelector("select[name=uf]")

    //é uma promessa
    // A Fetch API fornece uma interface para buscar recursos (por exemplo, em toda a rede).
                                            
    //Fazem a mesma coisa
    //.then( res => res.json() ) ---- .then( (res) => { return res.json() } )


    //Busca os dados no servidor do IBGE, se der certo, transforma em arquivo json, se der certo carrega os dados de cada estado no Select
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() } )
    .then( states => {

        //function(states){ Objeto state = states[1] }
        //for(state = states[0]; state != state[27]; state++)
        //Como se cada item do json fosse definido como um objeto States
        //Vou pegar cada um dos states e vou jogar na variável state
        for(const state of states)
        {
            // A propriedade Element.innerHTML define ou obtém a sintaxe HTML descrevendo os elementos descendentes.
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
    } )
}

//Função que vai carregar as cidades do estado
function getCities(event)
{
    //Pega o select que vai mostrar as cidades
    const citySelect = document.querySelector("[name=city]")
    //Pega o Input hidden que tem o nome de state. Vai servir para passar o nome do estado para o BD
    const stateInput = document.querySelector("[name=state]")

    // Uma referência ao objeto que enviou o evento. O objeto que enviou foi o Selector de name "uf"
    //Retorna o ID do último <option> que foi selecionado no Select "uf"
    const indexOfState = event.target.selectedIndex
    // Salva o texto que é encontrado na option com o ID que foi obtido anteriormente
    stateInput.value = event.target.options[indexOfState].text

    //pega o value do field, que no caso é o id do estado
    const ufValue = event.target.value
    const url = ` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // Busca os dados na url
    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        // Cria uma opção com cada cidade
        for(const city of cities)
        {
            citySelect.innerHTML += `<option value = "${city.id}">${city.nome}</option>`
        }

        // Habilita a seleção de cidades
        citySelect.disabled = false
    } )
}

//Chama a função para gerar os estados
populateUFs()

//Fica esperando acontecer o evento de "change" dentro do Selector "uf". Quando acontecer o evento, dispara a função getCities
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
