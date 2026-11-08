class Funcionario {
  static #proximoId = 1;

  #id;
  #nome;
  #idade;
  #cargo;
  #salario;

  constructor(nome, idade, cargo, salario) {
    this.#id = Funcionario.#proximoId++;
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = salario;
  }

  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  set nome(valor) {
    this.#nome = valor;
  }

  get idade() {
    return this.#idade;
  }

  set idade(valor) {
    this.#idade = valor;
  }

  get cargo() {
    return this.#cargo;
  }

  set cargo(valor) {
    this.#cargo = valor;
  }

  get salario() {
    return this.#salario;
  }

  set salario(valor) {
    this.#salario = valor;
  }

  toString() {
    return `#${this.id} | ${this.nome} | ${this.idade} anos | Cargo: ${this.cargo} | Salário: ${formatarMoeda(this.salario)}`;
  }
}

const funcionarios = [];
let funcionarioEmEdicao = null;

const formulario = document.getElementById("formulario-funcionario");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCargo = document.getElementById("cargo");
const campoSalario = document.getElementById("salario");
const mensagemErro = document.getElementById("erro");
const botaoSalvar = document.getElementById("salvar");
const botaoCancelar = document.getElementById("cancelar");
const linhasFuncionarios = document.getElementById("linhas-funcionarios");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function indicarErro(campo, mensagem) {
  mensagemErro.textContent = mensagem;
  campo.focus();
  return null;
}

function lerFormulario() {
  const nome = campoNome.value.trim();
  const idade = campoIdade.valueAsNumber;
  const cargo = campoCargo.value.trim().replace(/\s+/g, " ");
  const salario = campoSalario.valueAsNumber;

  if (nome === "") {
    return indicarErro(campoNome, "Informe o nome do funcionário.");
  }

  if (!Number.isSafeInteger(idade) || idade < 1) {
    return indicarErro(campoIdade, "Informe uma idade inteira maior que zero.");
  }

  if (cargo === "") {
    return indicarErro(campoCargo, "Informe o cargo do funcionário.");
  }

  if (!Number.isFinite(salario) || salario < 0) {
    return indicarErro(campoSalario, "Informe um salário maior ou igual a zero.");
  }

  return { nome, idade, cargo, salario };
}

function voltarAoCadastro() {
  funcionarioEmEdicao = null;
  formulario.reset();
  mensagemErro.textContent = "";
  botaoSalvar.textContent = "Cadastrar";
  botaoCancelar.hidden = true;
  campoNome.focus();
}

function editarFuncionario(funcionario) {
  funcionarioEmEdicao = funcionario;
  campoNome.value = funcionario.nome;
  campoIdade.value = funcionario.idade;
  campoCargo.value = funcionario.cargo;
  campoSalario.value = funcionario.salario;
  mensagemErro.textContent = "";
  botaoSalvar.textContent = "Salvar";
  botaoCancelar.hidden = false;
  campoNome.focus();
}

const cadastrarFuncionario = function ({ nome, idade, cargo, salario }) {
  const funcionario = new Funcionario(nome, idade, cargo, salario);
  funcionarios.push(funcionario);
};

const buscarPorId = function (id) {
  return funcionarios.find(function (funcionario) {
    return funcionario.id === id;
  });
};

const atualizarFuncionario = function (id, dados) {
  const funcionario = buscarPorId(id);
  if (!funcionario) return;

  funcionario.nome = dados.nome;
  funcionario.idade = dados.idade;
  funcionario.cargo = dados.cargo;
  funcionario.salario = dados.salario;
};

const excluirFuncionario = function (id) {
  const indice = funcionarios.findIndex(function (funcionario) {
    return funcionario.id === id;
  });
  if (indice === -1) return;

  funcionarios.splice(indice, 1);
  if (funcionarioEmEdicao !== null && funcionarioEmEdicao.id === id) {
    voltarAoCadastro();
  }

  renderizarTabela();
};

function renderizarTabela() {
  linhasFuncionarios.replaceChildren();

  if (funcionarios.length === 0) {
    const celula = linhasFuncionarios.insertRow().insertCell();
    celula.colSpan = 6;
    celula.textContent = "Nenhum funcionário cadastrado.";
    return;
  }

  funcionarios.forEach(function (funcionario) {
    const linha = linhasFuncionarios.insertRow();
    linha.insertCell().textContent = funcionario.id;
    linha.insertCell().textContent = funcionario.nome;
    linha.insertCell().textContent = funcionario.idade;
    linha.insertCell().textContent = funcionario.cargo;
    linha.insertCell().textContent = formatarMoeda(funcionario.salario);

    const acoes = linha.insertCell();
    const id = funcionario.id;

    const editar = document.createElement("button");
    editar.type = "button";
    editar.textContent = "Editar";
    editar.onclick = function () {
      const selecionado = buscarPorId(id);
      if (selecionado) editarFuncionario(selecionado);
    };

    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.textContent = "Excluir";
    excluir.onclick = function () {
      excluirFuncionario(id);
    };

    acoes.append(editar, " ", excluir);
  });
}

botaoSalvar.onclick = function (evento) {
  evento.preventDefault();

  const dados = lerFormulario();
  if (dados === null) return;

  if (funcionarioEmEdicao === null) {
    cadastrarFuncionario(dados);
  } else {
    atualizarFuncionario(funcionarioEmEdicao.id, dados);
  }

  renderizarTabela();
  voltarAoCadastro();
};

botaoCancelar.onclick = function () {
  voltarAoCadastro();
};

renderizarTabela();