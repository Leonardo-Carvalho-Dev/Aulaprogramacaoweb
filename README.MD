🐾 ONG Patas do Bem - Site Institucional e Cadastro de VoluntáriosEste projeto é um site institucional para a ONG Patas do Bem, focado na divulgação de seus projetos e, principalmente, na gestão de cadastro de novos voluntários utilizando recursos avançados de Front-End (JavaScript puro).

💡 Requisitos e Funcionalidades ImplementadasO foco principal do projeto é a página de cadastro (cadastro.html), onde as seguintes funcionalidades-chave foram implementadas:FuncionalidadeDescriçãoStatusPersistência de DadosArmazenamento dos dados dos voluntários no localStorage do navegador.
✅ CompletoExibição DinâmicaGeração automática da tabela de voluntários cadastrados na página (cadastro.html) via JavaScript.
✅ CompletoMáscara de TelefoneAplicação de máscara de entrada em tempo real para o formato (00) 00000-0000.
✅ CompletoValidação de FormulárioValidação para campos obrigatórios (nome, email, telefone, área de interesse e disponibilidade).
✅ CompletoValidação RegexUso de Expressões Regulares para garantir a consistência do formato de telefone.
✅ CompletoDesign ResponsivoO layout adapta-se a diferentes tamanhos de tela (mobile-first).
✅ Completo

📁 Estrutura de ArquivosO projeto está organizado em três páginas principais, que compartilham a mesma estilização e lógica JavaScript..
├── css/
│   └── style.css           # Estilos e responsividade do site.
├── js/
│   └── script.js           # Toda a lógica de front-end (Validação, Local Storage, Máscaras, Tabela).
├── imagens/                # Imagens do projeto (logo, banners).
├── index.html              # Página Inicial (Home).
├── projetos.html           # Página de Projetos e Informações sobre Doações.
└── cadastro.html           # Página principal do formulário e lista de voluntários.

💻 Detalhamento do script.jsO arquivo script.js contém todas as funções necessárias para o dinamismo da página de cadastro.FunçãoAplicaçãoObservaçõeshandleFormSubmit(event)FormulárioCaptura dados, realiza as validações (campos vazios e Regex) e salva o objeto voluntario no Local Storage.phoneMaskHandler(e)Máscara de EntradaAplica a formatação (00) 00000-0000 conforme o usuário digita.exibirVoluntarios()Tabela DinâmicaCarrega os dados do localStorage e injeta o código HTML da tabela na div id="tabelaVoluntarios".toggleMenu()NavegaçãoControla a abertura e fechamento do menu de navegação em dispositivos móveis.initializePageScripts()InicializaçãoAtivada no window.load. Anexa os listeners de eventos de submit e input (máscara) e chama exibirVoluntarios() para carregar os dados iniciais.

##  Deploy e Acesso ao Projeto

O site está publicado em ambiente de produção via **Netlify**:

 [Acessar o site da ONG Patas do Bem](https://patasdobem.netlify.app)

###  Detalhes do Deploy
- Ambiente: Netlify (integração automática com GitHub)
- Branch utilizada: `main`
- Build otimizada para produção (HTML, CSS e JS minificados)
- Layout responsivo e acessível (WCAG 2.1 Nível AA)
