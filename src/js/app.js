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

const formulario = document.getElementById("formulario-funcionario");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCargo = document.getElementById("cargo");
const campoSalario = document.getElementById("salario");
const mensagemErro = document.getElementById("erro");
const botaoSalvar = document.getElementById("salvar");
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
  formulario.reset();
  mensagemErro.textContent = "";
  campoNome.focus();
}

const cadastrarFuncionario = function ({ nome, idade, cargo, salario }) {
  const funcionario = new Funcionario(nome, idade, cargo, salario);
  funcionarios.push(funcionario);
};

function renderizarTabela() {
  linhasFuncionarios.replaceChildren();

  if (funcionarios.length === 0) {
    const celula = linhasFuncionarios.insertRow().insertCell();
    celula.colSpan = 5;
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
  });
}

botaoSalvar.onclick = function (evento) {
  evento.preventDefault();

  const dados = lerFormulario();
  if (dados === null) return;

  cadastrarFuncionario(dados);
  renderizarTabela();
  voltarAoCadastro();
};

renderizarTabela();