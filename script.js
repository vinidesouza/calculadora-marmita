let ingredientes = [];
let custoTotalGeral = 0;

function adicionarIngrediente() {
    const ingrediente = document.getElementById('ingrediente').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const unidade = document.getElementById('unidade').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;

    if (ingrediente && quantidade > 0 && preco > 0) {
        ingredientes.push({ ingrediente, quantidade, unidade, preco, categoria });
        custoTotalGeral += preco;
        atualizarLista();
        document.getElementById('ingrediente').value = "";
        document.getElementById('quantidade').value = "";
        document.getElementById('preco').value = "";
    }
}

function atualizarLista() {
    const lista = document.getElementById('listaIngredientes');
    lista.innerHTML = "";
    ingredientes.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.ingrediente} - ${item.quantidade}${item.unidade} - R$${item.preco} (${item.categoria})` +
            `<button onclick="removerIngrediente(${index})">Remover</button>`;
        lista.appendChild(li);
    });
    document.getElementById('custoTotal').innerText = `R$ ${custoTotalGeral.toFixed(2)}`;
}

function removerIngrediente(index) {
    custoTotalGeral -= ingredientes[index].preco;
    ingredientes.splice(index, 1);
    atualizarLista();
}

function calcularMarmitas() {
    // Lógica de cálculo
}

function calcularPrecoVenda(lucroPercentual) {
    // Lógica de cálculo de preço
}
