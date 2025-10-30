## ONG Patas do Bem — Site Institucional e Cadastro de Voluntários

Este projeto é um site institucional desenvolvido para a ONG Patas do Bem, com o objetivo de divulgar seus projetos e gerenciar o cadastro de novos voluntários utilizando JavaScript puro no Front-End.

## Funcionalidades Principais

A principal página do projeto é cadastro.html, onde se concentram as funcionalidades dinâmicas do site.

Funcionalidade	Descrição	Status
Persistência de Dados	Armazenamento dos dados dos voluntários no localStorage do navegador.	✅ Completo
Exibição Dinâmica	Geração automática da tabela de voluntários cadastrados via JavaScript.	✅ Completo
Máscara de Telefone	Aplicação de máscara em tempo real no formato (00) 00000-0000.	✅ Completo
Validação de Formulário	Verificação de campos obrigatórios: nome, email, telefone, área de interesse e disponibilidade.	✅ Completo
Validação com Regex	Expressões regulares garantem a consistência do formato de telefone.	✅ Completo
Design Responsivo	Layout adaptável a diferentes tamanhos de tela (mobile-first).	✅ Completo

## Estrutura de Pastas e Arquivos
📁 patas-do-bem/
├── css/
│   └── style.css           # Estilos e responsividade do site
│
├── js/
│   └── script.js           # Lógica de front-end (validações, localStorage, máscaras e tabela)
│
├── imagens/                # Imagens utilizadas no projeto (logo, banners)
│
├── index.html              # Página inicial (Home)
├── projetos.html           # Página de projetos e informações sobre doações
└── cadastro.html           # Página de cadastro de voluntários

## Detalhamento do script.js

O arquivo js/script.js centraliza toda a lógica dinâmica do projeto.

Função	Aplicação	Descrição
handleFormSubmit(event)	Formulário	Captura os dados, valida campos obrigatórios e formato de telefone, e salva o voluntário no localStorage.
phoneMaskHandler(e)	Máscara de entrada	Aplica a máscara (00) 00000-0000 enquanto o usuário digita.
exibirVoluntarios()	Tabela dinâmica	Carrega os dados do localStorage e gera dinamicamente a tabela dentro da div id="tabelaVoluntarios".
toggleMenu()	Navegação	Controla o menu responsivo em dispositivos móveis.
initializePageScripts()	Inicialização	Executada no window.onload; anexa os listeners de eventos e carrega os dados existentes.

## Tecnologias Utilizadas

HTML5 — Estrutura semântica das páginas

CSS3 — Estilização e design responsivo (mobile-first)

JavaScript (ES6+) — Validações, máscaras e manipulação dinâmica do DOM

Local Storage — Persistência dos dados de voluntários no navegador

##  Deploy e Acesso ao Projeto

O site está publicado em ambiente de produção via **Netlify**:

 [Acessar o site da ONG Patas do Bem](https://patasdobem.netlify.app)

###  Detalhes do Deploy
- Ambiente: Netlify (integração automática com GitHub)
- Branch utilizada: `main`
- Build otimizada para produção (HTML, CSS e JS minificados)
- Layout responsivo e acessível (WCAG 2.1 Nível AA)
