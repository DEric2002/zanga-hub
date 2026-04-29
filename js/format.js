document.getElementById("format-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    const linhas = textarea.value.split("\n");

    const MARGEM = 0.15; // ALTERAR O VALOR DA PORCENTAGEM

    let erro = false;

    const resultado = linhas
        .map((linha) => {
            if (!linha.trim()) return null;

            linha = linha.replace("Enviar", "").trim();

            const partes = linha.split("\t").map((p) => p.trim());

            // Validação básica de estrutura
            if (!partes[0] || !partes[1]) {
                erro = true;
                return null;
            }

            const codigo = partes[0];
            const descricao = partes[1];

            const precos = partes
                .filter((p) => p.includes("R$"))
                .map((p) => {
                    const valor = parseFloat(p.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());

                    if (isNaN(valor)) erro = true;

                    return valor;
                });

            if (precos.length === 0) {
                erro = true;
                return null;
            }

            const maiorPreco = Math.max(...precos);

            const precoComMargem = Math.ceil(maiorPreco * (1 + MARGEM));

            const precoFormatado = precoComMargem.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });

            return `${codigo} - ${descricao} - ${precoFormatado}`;
        })
        .filter(Boolean);

    // Se deu qualquer erro, aborta tudo
    if (erro) {
        alert("Falha ao formatar, tente colar novamente a lista de peças!");
        return;
    }

    textarea.value = resultado.join("\n");
});

//FUNÇÃO PARA COPIAR COM BOTÃO DIRETO
document.getElementById("copy-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    navigator.clipboard
        .writeText(textarea.value)
        .then(() => {
            const notification = document.getElementById("notification");
            notification.textContent = "Texto copiado para a área de transferência!";
            notification.style.display = "block";
            setTimeout(() => {
                notification.style.display = "none";
            }, 3000);
        })
        .catch((err) => {
            console.error("Erro ao copiar: ", err);
        });
});

//FUNÇÃO PARA LIMPAR O TEXTO COM BOTÃO
document.getElementById("clear-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    textarea.value = "";
    // NOTIFICAÇÃO DE LIMPEZA
    const notification = document.getElementById("notification");
    notification.textContent = "Texto limpo!";
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
});

//FUNÇÃO PARA COLOCAR EM MINÚSCULAS COM BOTÃO
document.getElementById("lower-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    textarea.value = textarea.value.toLowerCase();
});

//FUNÇÃO PARA COLOCAR EM MAIÚSCULAS COM BOTÃO
document.getElementById("upper-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    textarea.value = textarea.value.toUpperCase();
});
