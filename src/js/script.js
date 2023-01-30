const arrayCarrinho = []
const vitrineHTML = document.getElementById("vitrineHTML")
const menuCategorias = document.getElementById("botoesContainer")
const pesquisar = document.querySelector(".pesquisa--buscar")
const quantidadeHTML = document.getElementById("quantidadeHTML")
const totalHTML = document.getElementById("totalHTML")
const carrinhoHTML = document.getElementById("carrinho")
const carrinho__hidden = document.getElementById("hidden")

const vitrine = (array) => {
    vitrineHTML.innerHTML = ""
    array.forEach(elem => {
        let li = document.createElement("li")
        li.classList.add("listaProdutos__card")

        let img = document.createElement("img")
        img.classList.add("listaProdutos__img")
        img.src = elem.img
        img.alt = `Imagem ${elem.nome}`

        let h3 = document.createElement("h3")
        h3.classList.add("listaProdutos__nome")
        h3.innerText = elem.nome

        let span = document.createElement("span")
        span.classList.add("listaProdutos__secao")
        span.innerText = elem.secao

        let pNutrientes = document.createElement("p")
        pNutrientes.classList.add("listaProdutos__nutriente")
        pNutrientes.innerText = elem.componentes

        let div = document.createElement("div")
        div.classList.add("listaProdutos__div")

        let p = document.createElement("p")
        p.classList.add("listaProdutos__valor")
        p.innerText = Number(elem.preco).toLocaleString("pt-br", {style: "currency", currency: "BRL"})

        let btnAdd = document.createElement("button")
        btnAdd.id = elem.id
        btnAdd.classList.add("listaProdutos__add")
        btnAdd.innerText = "Comprar"

        div.append(p, btnAdd)
        li.append(img, h3, span, pNutrientes, div)
        vitrineHTML.appendChild(li)
    })
}

const carrinho = () => {
    if (arrayCarrinho.length > 0) {
        carrinho__hidden.classList.remove("hidden")
        carrinhoHTML.innerHTML = ""

        arrayCarrinho.forEach(elem => {
            let li = document.createElement("li")
            li.classList.add("carrinho__produto")

            let img = document.createElement("img")
            img.classList.add("carrinho__img")
            img.src = elem.img

            let div = document.createElement("div")
            div.classList.add("carrinho__div")

            let h3 = document.createElement("h3")
            h3.classList.add("carrinho__nome")
            h3.innerText = elem.nome

            let span = document.createElement("span")
            span.classList.add("listaProdutos__secao")
            span.innerText = elem.secao

            let p = document.createElement("p")
            p.classList.add("carrinho_valor")
            p.innerText = Number(elem.preco).toLocaleString("pt-br", {style: "currency", currency: "BRL"})
            
            div.append(h3, span, p)

            let btn = document.createElement("button")
            btn.classList.add("carrinho__remover")
            btn.innerHTML = `<img id="${elem.id}" src="./src/img/trash.png">`
            
            li.append(img, div, btn)
            carrinhoHTML.appendChild(li)
        }) 
    } else {
        carrinho__hidden.classList.add("hidden")
        carrinhoHTML.innerHTML = ""

        let li = document.createElement("li")
        li.classList.add("carrinho__vazio")

        let img = document.createElement("img")
        img.classList.add("carrinho__sacola")
        img.src = "./src/img/sacola.png"

        let p = document.createElement("p")
        p.classList.add("carrinho__textoVazio")
        p.innerText = "Por enquanto não temos produtos no carrinho"

        li.append(img, p)
        carrinhoHTML.appendChild(li)
    }
}

const total = () => {
    let totalPedido = arrayCarrinho.reduce((valorAnterio, valorAtual) => {
        return valorAnterio + Number(valorAtual.preco)
    }, 0)

    quantidadeHTML.innerText = arrayCarrinho.length
    totalHTML.innerText = totalPedido.toLocaleString("pt-br", {style: "currency", currency: "BRL"})
    
    return totalPedido
}

const filtroVitrine = (array, secao) => {
    return arrayFiltro = array.filter(elem => secao == elem.secao)
}

// FILTRO MENU
menuCategorias.addEventListener("click", (event) => {
    let secao = event.target
    let nomeSecao = secao.title

    if (secao.tagName == "BUTTON") {
        nomeSecao == "Todos Produtos" ? vitrine(produtos) : vitrine(filtroVitrine(produtos, nomeSecao))
    }
})

// PESQUISAR
pesquisar.addEventListener("keyup", () => {
    let texto = pesquisar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let resultado = []

    produtos.forEach((elem) => {
        let filtroNome = elem.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let filtroSecao = elem.secao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let filtroCategoria = elem.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (filtroNome.includes(texto) || filtroSecao.includes(texto) || filtroCategoria.includes(texto)) {
            resultado.push(elem)
        }
    })
    vitrine(resultado)
})

// ADICIONAR AO CARRINHO
vitrineHTML.addEventListener("click", (event) => {
    let target = event.target
    if (target.tagName == "BUTTON") {
        for (let key in produtos) {
            produtos[key].id == target.id ? arrayCarrinho.push(produtos[key]) : ""
        }
    }
    total()
    carrinho()
})

// REMOVER DO CARRINHO
carrinhoHTML.addEventListener("click", (event) => {
    let target = event.target
    let indexDeletar = -1

    if (target.tagName == "IMG") {
        arrayCarrinho.forEach((elem, index) => {
            target.id == elem.id ? indexDeletar = index : ""
        })
        indexDeletar != -1 ? arrayCarrinho.splice(indexDeletar, 1) : ""
    }
    total()
    carrinho()
})

vitrine(produtos)
carrinho()