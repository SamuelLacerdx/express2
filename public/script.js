const form = document.getElementById("formMercado");
const botaoSubmit = form.querySelector("button[type='submit']");

let compraEditandoId = null;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const preco = Number(document.getElementById("preco").value);

  if (compraEditandoId === null) {
    // Modo cadastro (POST)
    const resposta = await fetch("/compras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        quantidade: quantidade,
        preco: preco,
      }),
    });

    const compra = await resposta.json();
    console.log();
    mostrarMensagem("compra cadastrado com sucesso!");
  } else {
    // Modo edição (PUT)
    const resposta = await fetch(`/compras/${compraEditandoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        quantidade: quantidade,
        preco: preco,
      }),
    });

    if (resposta.status === 404) {
      mostrarMensagem("Erro: compra não encontrado.", true);
    } else {
      const compra = await resposta.json();
      console.log(compra);
      mostrarMensagem("compra atualizado com sucesso!");
    }

    // Sai do modo edição
    compraEditandoId = null;
    botaoSubmit.textContent = "Cadastrar compra";
  }

  form.reset();
  carregarcompras();
});

async function carregarcompras() {
  const resposta = await fetch("/compras");
  const compras = await resposta.json();

  const lista = document.getElementById("listaCompras");
  lista.innerHTML = "";

  let total = 0;

  compras.forEach((compra) => {
    const subtotal = compra.preco * compra.quantidade;
    total += subtotal;
    const item = document.createElement("p");
    console.log(total);
    item.innerHTML = `
        ${compra.nome} - ${compra.quantidade} X ${compra.preco} = ${subtotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL" } )} 
        <button onclick="editarCompra(${compra.id}, '${compra.nome}', '${compra.quantidade}', ${compra.preco})">
        Editar
        </button>
        <button onclick="excluirCompra(${compra.id})">
        Excluir
        </button>
        `;

    lista.appendChild(item);
  });
    document.getElementById("totalGeral").textContent = `Total: R$ ${total}`;

}

carregarcompras();

async function excluirCompra(id) {
  const resposta = await fetch(`/compras/${id}`, {
    method: "DELETE",
  });

  const resultado = await resposta.json();
  console.log(resultado);

  mostrarMensagem("COmpra removido com sucesso!");
  carregarcompras();
}

function editarCompra(id, nome, quantidade, preco) {
  document.getElementById("nome").value = nome;
  document.getElementById("quantidade").value = quantidade;
  document.getElementById("preco").value = preco;

  compraEditandoId = id;
  botaoSubmit.textContent = "Salvar Edição";
}

function mostrarMensagem(texto, erro = false) {
  const formMercado = document.getElementById("mensagem");
  formMercado.textContent = texto;
  formMercado.style.color = erro ? "red" : "green";

  setTimeout(() => {
    formMercado.textContent = "";
  }, 4000);
}
