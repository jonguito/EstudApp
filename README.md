# 📚 EstudApp

App mobile desenvolvido em **React Native + Expo** para ajudar estudantes da modalidade EAD a organizarem suas matérias e tarefas de estudo de forma simples e visual.

> Projeto acadêmico desenvolvido para a disciplina de **Programação para Dispositivos Móveis**, do curso de Análise e Desenvolvimento de Sistemas — **Universidade Vila Velha (UVV)**.

🔗 **Demo (Expo Snack):** https://snack.expo.dev/@jeanaco/aop-projeto-app-snack

---

## 💡 Sobre o projeto

Muitos estudantes EAD enfrentam dificuldade de organização e planejamento das próprias matérias e tarefas. O **EstudApp** foi criado para dar suporte a esses estudantes, oferecendo uma forma rápida de cadastrar matérias, criar tarefas de estudo com data e horário, e acompanhar um resumo geral do progresso — tudo em uma interface minimalista, com foco em clareza e hierarquia visual.

## ✨ Funcionalidades

### Cadastro de usuário
- Validação de nome completo (exige nome e sobrenome)
- Validação de formato de e-mail
- Senha com mínimo de 6 caracteres
- Envio dos dados para a API via `POST`, com fallback local caso a API esteja indisponível

### Lista de matérias
- Exibição das matérias em cards, com ícone e cor personalizados
- Busca por nome da matéria
- Filtro por categoria (Todas, Exatas, Humanas, Linguagens)
- Contador de tarefas vinculadas a cada matéria

### Adição de tarefas
- Seletor de dia da semana (calendário semanal)
- Campos de título, descrição, matéria e horário (com validação de formato `HH:MM`)
- Listagem das tarefas já cadastradas para o dia selecionado
- Envio para a API via `POST`

### Perfil / Resumo
- Dados do usuário logado (nome, e-mail e demais campos retornados pela API)
- Estatísticas gerais: total de matérias e de tarefas cadastradas
- Chips com as matérias em que o usuário está "matriculado"

## 🎨 Design

- **Prototipação:** Figma
- **Estilo:** minimalista, priorizando apenas o essencial para o usuário final
- **Paleta de cores:**
  - `#4F46E5` (índigo intenso) — tela principal, remete a sabedoria e compaixão
  - `#818CF8` (azul-celeste) — demais telas, remete a confiança, responsabilidade e calma

## 🛠️ Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 54)
- [React Navigation](https://reactnavigation.org/) — navegação em Drawer (menu lateral)
- Context API — gerenciamento de estado global (usuário, matérias, tarefas)
- [MockAPI](https://mockapi.io/) — simulação de backend REST para persistência de dados

## 🔌 Persistência de dados

O app consome uma API REST criada no **MockAPI**:

- `GET /tarefas` — carrega as tarefas salvas ao iniciar o app
- `POST /usuarios` — cadastra um novo usuário
- `POST /tarefas` — cadastra uma nova tarefa

Caso a integração com a API falhe (sem internet, API fora do ar, etc.), o app exibe um aviso ao usuário e mantém os dados salvos localmente na sessão, sem travar o uso do aplicativo.

## 📂 Estrutura do projeto

```
├── App.js                      # Ponto de entrada, monta o contexto e a navegação
├── context/
│   └── AppContext.js           # Estado global (usuário, matérias, tarefas) + chamadas à API
├── navigation/
│   ├── DrawerNavigator.js      # Configuração das rotas (menu lateral)
│   └── DrawerContent.js        # Conteúdo customizado do menu lateral
├── screens/
│   ├── CadastroScreen.js       # Tela de cadastro de usuário
│   ├── MateriasScreen.js       # Lista de matérias (busca + filtro)
│   ├── AdicionarTarefaScreen.js# Cadastro de tarefas + calendário semanal
│   └── PerfilScreen.js         # Perfil / resumo do usuário
└── components/
    ├── MateriasCard/           # Card de matéria usado na FlatList
    ├── TarefaItem/             # Item de tarefa na listagem
    └── PickerModal/            # Seletor customizado (dropdown em modal), sem dependências nativas
```

## ▶️ Como executar o projeto

Pré-requisitos: [Node.js](https://nodejs.org/) e o app **Expo Go** instalado no celular (ou um emulador Android/iOS configurado).

```bash
# Clone o repositório
git clone https://github.com/jonguito/EstudApp.git
cd estudapp

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

Depois é só escanear o QR Code com o app **Expo Go** (Android/iOS) ou rodar em um emulador com:

```bash
npm run android   # emulador Android
npm run ios       # simulador iOS
npm run web       # versão web
```

## 👥 Autores

Projeto desenvolvido em grupo para a disciplina de Programação para Dispositivos Móveis (UVV):

- Jean Alexandre Cabral de Oliveira
- João Victor Fernandes do Prado
- Matheus de Oliveira de Souza
- João Ângelo Lima Caliari

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
