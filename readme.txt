Read [](file:///c%3A/Users/ericd/Desktop/zangahub/js/format.js#1-1), lines 1 to 100

Read [](file:///c%3A/Users/ericd/Desktop/zangahub/js/format.js#101-101), lines 101 to 130

# Relatório Detalhado do Arquivo format.js

## Introdução

Este relatório explica passo a passo o arquivo format.js, que é um script JavaScript usado em uma página web "Formatar" (parte de um projeto chamado ZangaHub). O arquivo contém código para interagir com elementos da página HTML, como botões e áreas de texto. Ele permite formatar listas de peças, assim resolvendo um problema real.

O código é escrito em JavaScript, uma linguagem de programação para web. Ele usa o DOM (Document Object Model) para acessar e modificar elementos da página. Irei dividir em seções para explicar cada parte de forma clara e simples.

## Seção 1: Formatação de Orçamentos (Botão "Formatar Orçamento")

Esta parte do código adiciona uma função ao botão com ID `format-button`. Quando o usuário clica nele, o código processa o texto inserido em uma área de texto chamada `lista-pecas`.

### Código:
```javascript
document.getElementById("format-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    const linhas = textarea.value.split("\n");

    const MARGEM = 0.15; // ALTERAR O VALOR DA PORCENTAGEM(ESSA PORCENTAGEM PODE VARIAR SEGUINDO ORDENS DA GERENCIA)

    let erro = false;

    const resultado = linhas
        .map((linha) => {
            // Processamento de cada linha
        })
        .filter(Boolean);

    // Se deu qualquer erro, aborta tudo
    if (erro) {
        alert("Falha ao formatar, tente colar novamente a lista de peças!");
        return;
    }

    textarea.value = resultado.join("\n");
});
```

### Explicação Passo a Passo:
1. **Adiciona um ouvinte de evento**: `document.getElementById("format-button").addEventListener("click", function () { ... })` significa que quando o botão é clicado, a função dentro das chaves é executada.
2. **Obtém o texto da área de texto**: `const textarea = document.getElementById("lista-pecas");` encontra o elemento HTML com ID `lista-pecas` (uma caixa de texto grande).
3. **Divide o texto em linhas**: `const linhas = textarea.value.split("\n");` separa o texto em uma lista de linhas, usando quebras de linha (`\n`) como separador.
4. **Define a margem**: `const MARGEM = 0.15;` é uma constante que representa 15% de margem (pode ser alterada para mudar a porcentagem).
5. **Inicializa variável de erro**: `let erro = false;` cria uma variável para rastrear se houve problemas.
6. **Processa cada linha**: Usa `.map()` para transformar cada linha. Para cada linha:
   - Remove linhas vazias: `if (!linha.trim()) return null;`
   - Remove "Enviar" e espaços: `linha = linha.replace("Enviar", "").trim();`
   - Divide em partes usando tabulação: `const partes = linha.split("\t").map((p) => p.trim());`
   - Valida estrutura: Se não há código ou descrição, marca erro.
   - Extrai código e descrição: `const codigo = partes[0]; const descricao = partes[1];`
   - Encontra preços: Filtra partes com "R$", converte para números (removendo "R$", pontos e vírgulas).
   - Calcula o maior preço: `const maiorPreco = Math.max(...precos);`
   - Aplica margem: `const precoComMargem = Math.ceil(maiorPreco * (1 + MARGEM));` (arredonda para cima).
   - Formata como moeda brasileira: `const precoFormatado = precoComMargem.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });`
   - Retorna linha formatada: `${codigo} - ${descricao} - ${precoFormatado}`
7. **Filtra resultados**: `.filter(Boolean)` remove valores nulos (linhas vazias ou com erro).
8. **Verifica erros**: Se `erro` é true, mostra alerta e para.
9. **Atualiza a área de texto**: `textarea.value = resultado.join("\n");` junta as linhas formatadas de volta.

**Objetivo**: Transformar uma lista colada de peças em um formato limpo com códigos, descrições e preços com margem.

## Seção 2: Copiar Texto (Botão "Copiar")

Adiciona função ao botão `copy-button` para copiar o conteúdo da área de texto para a área de transferência do navegador.

### Código:
```javascript
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
```

### Explicação Passo a Passo:
1. **Ouvinte de clique**: Executa quando o botão é clicado.
2. **Obtém texto**: Pega o valor da área de texto.
3. **Copia para clipboard**: `navigator.clipboard.writeText()` copia o texto. É assíncrono (promessa).
4. **Sucesso**: Mostra notificação: encontra elemento `notification`, muda texto, mostra por 3 segundos.
5. **Erro**: Se falhar, loga erro no console.

**Objetivo**: Permitir copiar o texto formatado facilmente.

## Seção 3: Limpar Texto (Botão "Limpar")

Adiciona função ao botão `clear-button` para esvaziar a área de texto e mostrar notificação.

### Código:
```javascript
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
```

### Explicação Passo a Passo:
1. **Ouvinte de clique**: Executa ao clicar.
2. **Limpa texto**: Define `textarea.value = "";`.
3. **Notificação**: Muda texto da notificação, mostra por 3 segundos.

**Objetivo**: Resetar a área de texto.

## Seção 4: Converter para Minúsculas (Botão "lower-button")

Adiciona função para converter todo o texto para minúsculas.

### Código:
```javascript
document.getElementById("lower-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    textarea.value = textarea.value.toLowerCase();
});
```

### Explicação Passo a Passo:
1. **Ouvinte de clique**: Executa ao clicar.
2. **Converte**: `toLowerCase()` transforma letras maiúsculas em minúsculas.

**Objetivo**: Alterar case do texto.

## Seção 5: Converter para Maiúsculas (Botão "upper-button")

Similar ao anterior, mas para maiúsculas.

### Código:
```javascript
document.getElementById("upper-button").addEventListener("click", function () {
    const textarea = document.getElementById("lista-pecas");
    textarea.value = textarea.value.toUpperCase();
});
```

### Explicação Passo a Passo:
1. **Ouvinte de clique**: Executa ao clicar.
2. **Converte**: `toUpperCase()` transforma letras minúsculas em maiúsculas.

**Objetivo**: Alterar case do texto.

## Seção 6: Gerenciamento do Menu Lateral (Itens Ativos)

Esta parte gerencia qual item do menu lateral está "ativo" (com classe `active-page`), persistindo entre páginas usando `localStorage`.

### Código:
```javascript
// CARREGAR O ITEM ATIVO DO LOCALSTORAGE AO CARREGAR A PÁGINA
const activeItem = localStorage.getItem("activeMenuItem");
if (activeItem) {
    document.querySelectorAll(".side-item").forEach((item) => {
        const span = item.querySelector("span");
        if (span && span.textContent.trim() === activeItem) {
            item.classList.add("active-page");
        }
    });
}

// ADICIONAR EVENT LISTENERS PARA ALTERNAR O ITEM ATIVO
document.querySelectorAll(".side-item").forEach((item) => {
    item.addEventListener("click", () => {
        const span = item.querySelector("span");
        if (span) {
            localStorage.setItem("activeMenuItem", span.textContent.trim());
        }
        // Remove active-page from all items
        document.querySelectorAll(".side-item").forEach((i) => i.classList.remove("active-page"));
        // Add active-page to the clicked item
        item.classList.add("active-page");
    });
});
```

### Explicação Passo a Passo:
1. **Carregar ativo**: Ao carregar a página, pega o item salvo em `localStorage` (armazenamento local do navegador).
2. **Aplicar classe**: Para cada item do menu (`.side-item`), verifica se o texto do `<span>` (ex: "Formatar") matches o salvo, e adiciona classe `active-page` (para estilo visual).
3. **Ouvinte de clique**: Para cada item, ao clicar:
   - Salva o texto do `<span>` no `localStorage`.
   - Remove `active-page` de todos os itens.
   - Adiciona `active-page` ao clicado.

**Objetivo**: Manter um item do menu destacado como ativo, persistindo entre navegações.

## Conclusão

Este arquivo format.js transforma uma página HTML estática em uma ferramenta interativa para formatar orçamentos de peças. Ele usa eventos de clique para processar texto, copiar, limpar e alterar case, além de gerenciar o estado visual do menu. Cada função é independente e focada em uma tarefa específica. Para entender melhor, teste a página em um navegador e observe os efeitos dos botões. Se precisar de mais detalhes ou modificações, consulte a documentação do JavaScript ou MDN Web Docs.