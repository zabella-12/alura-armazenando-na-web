const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
//consultando se o localStorage está preenchido, se sim transforma novamente em cod p/ o js; se não cria um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(element => {
    criaElemento(element)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

     //verifica se o item já existe
     const existe = itens.find(element => element.nome === nome.value)
    //objeto incrementado no array itens
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
   
    if (existe) {
        itemAtual.id = existe.id
         atualizaElemento(itemAtual)

       //Refatoração da condicional if else, atualizando um id para cada item
       itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual)
        //função de incrementação toda vez que tiver um novo objeto no JSON
        itens.push(itemAtual)
    }




    //necessário transformar o JSON em texto para ser suportado no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))


    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))
    lista.appendChild(novoItem)

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(element => element.id === id),1)
    localStorage.setItem("itens", JSON.stringify(itens))
}