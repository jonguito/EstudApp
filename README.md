# EstudApp

App mobile em React Native + Expo pra ajudar estudante de EAD a não se perder com matéria e tarefa. Foi um projeto da faculdade (disciplina de Programação para Dispositivos Móveis, ADS - UVV), mas foi construído como um app de verdade: tem cadastro, lista de matérias, criação de tarefas com calendário e um perfil com resumo geral.

Demo no Expo Snack: https://snack.expo.dev/@jeanaco/aop-projeto-app-snack

---

## Sobre o projeto

A ideia surgiu de um problema bem comum de quem estuda EAD: é fácil perder o fio da meada de quais matérias tem tarefa pendente e quando. O EstudApp resolve isso de um jeito simples — você cadastra as matérias, joga as tarefas com data e horário, e tem uma tela de perfil que resume tudo de uma vez.

## Funcionalidades

**Cadastro de usuário**
- Validação de nome completo (exige nome e sobrenome), e-mail e senha (mínimo 6 caracteres)
- Manda os dados pra API; se a API cair, salva localmente e avisa o usuário em vez de travar o app

**Lista de matérias**
- Cards de matéria com ícone e cor
- Busca por nome e filtro por categoria (Exatas, Humanas, Linguagens)
- Contador de quantas tarefas cada matéria tem

**Adição de tarefas**
- Calendário semanal pra escolher o dia
- Título, descrição, matéria vinculada e horário (com validação de formato `HH:MM`)
- Lista as tarefas do dia selecionado

**Perfil / Resumo**
- Dados do usuário logado
- Total de matérias e tarefas cadastradas
- Matérias em que o usuário está "matriculado", em chips

## Design

Prototipado no Figma antes de sair codando. Optei por um visual minimalista — só o essencial na tela, sem poluição — usando `#4F46E5` (índigo) na tela principal e `#818CF8` (azul mais claro) no resto do app, pra manter uma identidade visual consistente entre as telas.

## Tecnologias

- React Native + Expo (SDK 54)
- React Navigation (Drawer)
- Context API pra estado global (usuário, matérias, tarefas)
- MockAPI como backend REST pra persistência

## Persistência de dados

O app consome uma API REST no MockAPI:

- `GET /tarefas` — carrega as tarefas salvas ao abrir o app
- `POST /usuarios` — cadastra um novo usuário
- `POST /tarefas` — cadastra uma nova tarefa

Se a API falhar (sem internet, fora do ar, etc.), o app não trava — ele avisa o usuário e segue funcionando com os dados salvos localmente na sessão.

## O que foi mais chato / o que aprendi

Um dos maiores perrengues foi o seletor de matéria/categoria (o "Picker"). O componente nativo de Picker do React Native dá dor de cabeça em ambiente Snack e às vezes se comporta diferente entre Android e iOS — então acabei construindo um modal próprio (`PickerModal`) do zero, só com `Modal` + `FlatList`, sem depender de nenhum módulo nativo. Resolveu o problema e ainda ficou mais fácil de estilizar do jeito que eu queria.

Outro ponto foi pensar no que acontece quando a API falha — não queria que o app simplesmente travasse ou mostrasse uma tela em branco se o MockAPI ficasse fora do ar, então implementei um fallback local com aviso pro usuário. Foi a primeira vez que parei pra pensar nesse tipo de cenário de "coisa dando errado" com mais cuidado, e não só no caminho feliz.

## Estrutura do projeto

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

## Como executar o projeto

Pré-requisitos: Node.js e o app Expo Go instalado no celular (ou um emulador Android/iOS configurado).

```bash
git clone https://github.com/jonguito/EstudApp.git
cd EstudApp

npm install

npx expo start
```

Depois é só escanear o QR Code com o Expo Go (Android/iOS) ou rodar em um emulador:

```bash
npm run android   # emulador Android
npm run ios       # simulador iOS
npm run web       # versão web
```

## Autores

Projeto desenvolvido em grupo para a disciplina de Programação para Dispositivos Móveis (UVV):

- Jean Alexandre Cabral de Oliveira
- João Victor Fernandes do Prado
- Matheus de Oliveira de Souza
- João Ângelo Lima Caliari

## Licença

Projeto desenvolvido para fins acadêmicos.
