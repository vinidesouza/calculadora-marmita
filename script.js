let ingredientes = [];

function adicionarIngrediente() {
    const descricao = document.getElementById('descricao').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const unidade = document.getElementById('unidade').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;

    if (descricao && quantidade > 0 && preco > 0) {
        ingredientes.push({ descricao, quantidade, unidade, preco, categoria });
        atualizarLista();
        document.getElementById('formMarmita').reset();
    }
}

function atualizarLista() {
    const lista = document.getElementById('listaIngredientes');
    lista.innerHTML = "";
    ingredientes.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.descricao} - ${item.quantidade}${item.unidade} - R$${item.preco} (${item.categoria})`;
        lista.appendChild(li);
    });
}

function calcularMarmitas() {
    let totalProteina = 0, totalCarbo = 0, totalVegetal = 0, totalExtra = 0;
    let custoTotal = 0;

    ingredientes.forEach(item => {
        let quantidadeConvertida = item.quantidade;
        if (item.unidade === "unid") {
            quantidadeConvertida *= 0.2; // Conversão para kg (exemplo: cada unidade = 200g)
        }

        custoTotal += item.preco;
        switch (item.categoria) {
            case "proteina": totalProteina += quantidadeConvertida; break;
            case "carboidrato": totalCarbo += quantidadeConvertida; break;
            case "vegetal": totalVegetal += quantidadeConvertida; break;
            case "extra": totalExtra += quantidadeConvertida; break;
        }
    });

    const proteinaPorMarmita = 150; 
    const carboPorMarmita = 200; 
    const vegetalPorMarmita = 100; 

    const qtdMarmitasProteina = totalProteina > 0 ? Math.floor(totalProteina / proteinaPorMarmita) : Infinity;
    const qtdMarmitasCarbo = totalCarbo > 0 ? Math.floor(totalCarbo / carboPorMarmita) : Infinity;
    const qtdMarmitasVegetal = totalVegetal > 0 ? Math.floor(totalVegetal / vegetalPorMarmita) : Infinity;

    const marmitasPossiveis = Math.min(qtdMarmitasProteina, qtdMarmitasCarbo, qtdMarmitasVegetal);
    const custoPorMarmita = marmitasPossiveis > 0 && marmitasPossiveis !== Infinity ? (custoTotal / marmitasPossiveis).toFixed(2) : 0;

    document.getElementById('resultado').innerHTML = marmitasPossiveis > 0 && marmitasPossiveis !== Infinity ? `
        <strong>Marmitas possíveis:</strong> ${marmitasPossiveis} <br>
        <strong>Custo por marmita:</strong> R$ ${custoPorMarmita}
    ` : `<strong>Erro:</strong> Ingredientes insuficientes para calcular uma marmita.`;
}
