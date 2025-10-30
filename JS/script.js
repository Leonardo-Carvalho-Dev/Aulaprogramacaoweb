/* FUNÇÕES DE NAVEGAÇÃO*/
function toggleMenu() {
  const menu = document.getElementById('menu-list');
  menu.classList.toggle('active');
}

// Fecha o menu ao clicar em um link
function closeMenu() {
  const menu = document.getElementById('menu-list');
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  }
}

/*  MÁSCARA DE TELEFONE  */
function phoneMaskHandler(e) {
  let valor = e.target.value.replace(/\D/g, '');
  if (valor.length > 11) valor = valor.slice(0, 11);
  valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
  valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
  e.target.value = valor;
}

/* SUBMISSÃO E VALIDAÇÃO DO FORMULÁRIO */
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('cadastroForm');

  // Coleta dos campos
  const nome = form.elements['nome'].value.trim();
  const email = form.elements['email'].value.trim();
  const telefone = form.elements['telefone'].value.trim();
  const areasInteresse = form.elements['areas_interesse'].value;
  const disponibilidade = form.elements['disponibilidade']
    ? form.elements['disponibilidade'].value.trim()
    : "";

  // Validação básica
  if (!nome || !email || !telefone || !areasInteresse || !disponibilidade) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Validação do formato do telefone
  const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    alert('Por favor, preencha o telefone no formato (00) 00000-0000.');
    return;
  }

 
  const novoVoluntario = {
    nome,
    email,
    telefone,
    areasInteresse,
    disponibilidade,
    dataCadastro: new Date().toLocaleDateString('pt-BR'),
  };

  const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
  voluntarios.push(novoVoluntario);
  localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

 
  exibirVoluntarios();

  
  form.reset();

  
  const successMessage = document.getElementById('successMessage');
  successMessage.innerText =
    '✅ Cadastro realizado com sucesso! Entraremos em contato em breve.';
  successMessage.style.display = 'block';
  successMessage.classList.add('active');

  // Oculta após 5 segundos
  setTimeout(() => {
    successMessage.classList.remove('active');
    setTimeout(() => (successMessage.style.display = 'none'), 300);
  }, 5000);
}

/*  EXIBIR VOLUNTÁRIOS NA TABELA */
function exibirVoluntarios() {
  const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
  const tabelaDiv = document.getElementById('tabelaVoluntarios');

  if (!tabelaDiv) return;

  if (voluntarios.length === 0) {
    tabelaDiv.innerHTML =
      '<p class="alert">Nenhum voluntário cadastrado ainda.</p>';
    return;
  }

  let tableHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Interesse</th>
            <th>Disponibilidade</th>
            <th>Cadastro</th>
          </tr>
        </thead>
        <tbody>
  `;

  voluntarios.forEach((v) => {
    tableHTML += `
      <tr>
        <td>${v.nome}</td>
        <td>${v.email}</td>
        <td>${v.telefone}</td>
        <td>${v.areasInteresse}</td>
        <td>${v.disponibilidade}</td>
        <td>${v.dataCadastro}</td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  tabelaDiv.innerHTML = tableHTML;
}

/* INICIALIZAÇÃO GERAL  */
function initializePageScripts() {
  const form = document.getElementById('cadastroForm');

  if (form) {
    // Evita múltiplos binds
    form.removeEventListener('submit', handleFormSubmit);
    form.addEventListener('submit', handleFormSubmit);

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
      telefoneInput.removeEventListener('input', phoneMaskHandler);
      telefoneInput.addEventListener('input', phoneMaskHandler);
    }

    exibirVoluntarios();
  }
}

/* ANIMAÇÃO DE SCROLL  */
window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.card, .project-card');
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (cardTop < windowHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});

/* INICIALIZAÇÃO AUTOMÁTICA */
window.addEventListener('load', () => {
  initializePageScripts();
});
