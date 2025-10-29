// =================================================================
//                      FUNÇÕES DE NAVEGAÇÃO
// =================================================================
function toggleMenu() {
    const menu = document.getElementById('menu-list');
    menu.classList.toggle('active');
}

// Limpar Voluntários //
function resetVoluntarios() {
    
    if (confirm('Tem certeza que deseja apagar TODOS os voluntários cadastrados? Esta ação é irreversível.')) {
        
        localStorage.removeItem('voluntarios');
      
        exibirVoluntarios();

        alert('Lista de voluntários apagada com sucesso!');
    }
}

// Função de Máscara de Telefone //
function phoneMaskHandler(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = valor;
}

// **Função de Inicialização de Scripts da Página**
function initializePageScripts() {
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.removeEventListener('submit', handleFormSubmit); 
        form.addEventListener('submit', handleFormSubmit);
        exibirVoluntarios(); // Carrega os dados existentes

        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.removeEventListener('input', phoneMaskHandler);
            telefoneInput.addEventListener('input', phoneMaskHandler);
        }
    }
    
    const resetBtn = document.getElementById('resetVoluntariosBtn');
    if (resetBtn) {
        resetBtn.removeEventListener('click', resetVoluntarios); 
        resetBtn.addEventListener('click', resetVoluntarios);
    }
    
   
    window.dispatchEvent(new Event('scroll')); 
}


// INICIALIZAÇÃO GERAL//

window.addEventListener('load', () => {
    
    initializePageScripts();
});


// scroll //
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    
        const headerheeight = document.querySelector('.header').offsetHeight;
        window.scrollBy(0, -headerheeight);

        const menu = document.getElementById('menu-list');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
}

// Função: Verificação de Consistência e Submissão do Formulário //
function handleFormSubmit(event) {
    event.preventDefault();
   
    const form = document.getElementById('cadastroForm');
    
  
    const nome = form.elements['nome'].value;
    const email = form.elements['email'].value;
    const telefone = form.elements['telefone'].value;
    
    const areasInteresse = form.elements['areas_interesse'].value; 
    const disponibilidade = form.elements['disponibilidade'].value;

    
    // Validação de Consistência de Dados //
    if (!nome || !email || !telefone || areasInteresse === "" || !disponibilidade) {
        alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Telefone, Área de Interesse e Disponibilidade).');
        return;
    }
    

    // Coleta dos dados //
    const formData = {
        nome,
        email,
        telefone,
        areasInteresse,
        disponibilidade,
        dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    
    // Armazenamento Local //
    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    //  Mensagem de Sucesso //
    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = '✅ Cadastro realizado com sucesso! Entraremos em contato em breve.';
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth' }); 
    form.reset();

    // Esconde a mensagem após 5 segundos //
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);

    // Atualiza a lista de voluntários //
    exibirVoluntarios();
}


// Função: Sistema de Templates JavaScript //
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    const tabelaDiv = document.getElementById('tabelaVoluntarios');

    if (!tabelaDiv) return; 

    if (voluntarios.length === 0) {
        tabelaDiv.innerHTML = '<p class="alert">Nenhum voluntário cadastrado ainda.</p>';
        return;
    } 
    
    let tableHTML = '<h3 class="mt-4"></h3><table>';
  
    tableHTML += '<thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Interesse</th><th>Disponibilidade</th><th>Cadastro</th></tr></thead>';
    tableHTML += '<tbody>';

    voluntarios.forEach(voluntario => {
        tableHTML += `
            <tr>
                <td>${voluntario.nome}</td>
                <td>${voluntario.email}</td>
                <td>${voluntario.telefone}</td>
                <td>${voluntario.areasInteresse}</td>
                <td>${voluntario.disponibilidade}</td> <td>${voluntario.dataCadastro}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    tabelaDiv.innerHTML = tableHTML;
}


// Máscara de Telefone //
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = valor;
    });
}

// Listener de Animação de Scroll //
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Inicialização: Exibe voluntários e anexa o listener do formulário //
window.addEventListener('load', () => {
    exibirVoluntarios();
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// **NOVA FUNÇÃO: Resetar o Histórico de Voluntários**
function resetVoluntarios() {
    // Pede confirmação antes de apagar, pois é uma ação irreversível
    if (confirm('Tem certeza que deseja apagar TODOS os voluntários cadastrados? Esta ação é irreversível.')) {
        
        // **AÇÃO PRINCIPAL:** Remove a chave 'voluntarios' do Local Storage
        localStorage.removeItem('voluntarios');
        
        // Atualiza a exibição da tabela (que agora mostrará a mensagem de 'Nenhum voluntário cadastrado')
        exibirVoluntarios();

        alert('Lista de voluntários apagada com sucesso!');
    }
}
