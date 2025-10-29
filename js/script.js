// FUNÇÕES DE NAVEGAÇÃO //
function toggleMenu() {
    const menu = document.getElementById('menu-list');
    menu.classList.toggle('active');
}

// Função de Máscara de Telefone (Handler Reutilizável) //
function phoneMaskHandler(e) {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = valor;
}

// FUNÇÃO DE SUBMISSÃO E VALIDAÇÃO (Inclui REGEX) //
function handleFormSubmit(event) {
    event.preventDefault();
   
    const form = document.getElementById('cadastroForm');
    
    // Coleta dos campos //
    const nome = form.elements['nome'].value;
    const email = form.elements['email'].value;
    const telefone = form.elements['telefone'].value;
    const areasInteresse = form.elements['areas_interesse'].value; 
    const disponibilidade = form.elements['disponibilidade'].value;

    
    // Validação de Consistência (Campos Vazios) //
    if (!nome || !email || !telefone || areasInteresse === "" || !disponibilidade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validação de Consistência (Formato REGEX do Telefone) //
    const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Por favor, preencha o Telefone no formato (00) 00000-0000.');
        return;
    }

    // Armazenamento Local //
    const formData = {
        nome, email, telefone, areasInteresse, disponibilidade,
        dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    
    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    // Feedback visual //
    const successMessage = document.getElementById('successMessage');
    successMessage.innerText = '✅ Cadastro realizado com sucesso! Entraremos em contato em breve.';
    successMessage.style.display = 'block';
    form.reset();

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);

    exibirVoluntarios();
}


// FUNÇÃO DE TEMPLATES //
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    const tabelaDiv = document.getElementById('tabelaVoluntarios');

    if (!tabelaDiv) return; 

    if (voluntarios.length === 0) {
        tabelaDiv.innerHTML = '<p class="alert">Nenhum voluntário cadastrado ainda.</p>';
        return;
    } 
    
    let tableHTML = '<table>'; 
    tableHTML += '<thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Interesse</th><th>Disponibilidade</th><th>Cadastro</th></tr></thead>';
    tableHTML += '<tbody>';

    voluntarios.forEach(voluntario => {
        tableHTML += `
            <tr>
                <td>${voluntario.nome}</td>
                <td>${voluntario.email}</td>
                <td>${voluntario.telefone}</td>
                <td>${voluntario.areasInteresse}</td>
                <td>${voluntario.disponibilidade}</td>
                <td>${voluntario.dataCadastro}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    tabelaDiv.innerHTML = tableHTML;
}


// FUNÇÃO DE INICIALIZAÇÃO //
function initializePageScripts() {
    // Configura o Formulário (Submit e Máscara) //
    const form = document.getElementById('cadastroForm');
    if (form) {
        form.removeEventListener('submit', handleFormSubmit); 
        form.addEventListener('submit', handleFormSubmit);
        exibirVoluntarios();

        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.removeEventListener('input', phoneMaskHandler);
            telefoneInput.addEventListener('input', phoneMaskHandler);
        }
    }
    
    window.dispatchEvent(new Event('scroll')); 
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

// INICIALIZAÇÃO GERAL //
window.addEventListener('load', () => {
    initializePageScripts();
});