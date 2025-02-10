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
            ` <button onclick="removerIngrediente(${index})">Remover</button>`;
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
    let totalProteina = 0, totalCarbo = 0, totalVegetal = 0;
    ingredientes.forEach((item) => {
        let quantidadeConvertida = item.quantidade;
        if (item.unidade === "unid") {
            quantidadeConvertida *= 0.2;
        }
        switch (item.categoria) {
            case "proteina":
                totalProteina += quantidadeConvertida;
                break;
            case "carboidrato":
                totalCarbo += quantidadeConvertida;
                break;
            case "vegetal":
                totalVegetal += quantidadeConvertida;
                break;
        }
    });

    const proteinaPorMarmita = 0.15; // 150g em kg
    const carboPorMarmita = 0.2; // 200g em kg
    const vegetalPorMarmita = 0.1; // 100g em kg

    const qtdMarmitasProteina = Math.floor(totalProteina / proteinaPorMarmita);
    const qtdMarmitasCarbo = Math.floor(totalCarbo / carboPorMarmita);
    const qtdMarmitasVegetal = Math.floor(totalVegetal / vegetalPorMarmita);

    const marmitasPossiveis = Math.min(qtdMarmitasProteina, qtdMarmitasCarbo, qtdMarmitasVegetal);
    const custoPorMarmita = (custoTotalGeral / marmitasPossiveis).toFixed(2);

    document.getElementById('resultado').innerHTML = marmitasPossiveis > 0
        ? `<strong>Marmitas possíveis:</strong> ${marmitasPossiveis}<br><strong>Custo por marmita:</strong> R$ ${custoPorMarmita}`
        : `<strong>Erro:</strong> Ingredientes insuficientes para calcular marmitas.`;
}

function calcularPrecoVenda(lucroPercentual) {
    if (custoTotalGeral > 0) {
        const precoPorMarmita = custoTotalGeral / marmitasPossiveis;
        const precoVenda = (precoPorMarmita * (1 + lucroPercentual / 100)).toFixed(2);
        document.getElementById('precoVenda').innerText = `Preço sugerido para ${lucroPercentual}% de lucro: R$ ${precoVenda}`;
    }
}
