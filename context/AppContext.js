import React, { createContext, useContext, useState, useEffect } from 'react';


export const API_BASE_URL = 'https://6a2345cc5c610353286acf50.mockapi.io/Estudapp/api/:endpoint';

export const AppContext = createContext(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext deve ser usado dentro de AppProvider');
  return ctx;
};

const MATERIAS_PADRAO = [
  { id: '1', nome: 'Português',  icone: '📖', cor: '#FF8C69' },
  { id: '2', nome: 'Matemática', icone: '✏️',  cor: '#FFD700' },
  { id: '3', nome: 'História',   icone: '🌐', cor: '#98D8C8' },
  { id: '4', nome: 'Geografia',  icone: '🧭', cor: '#B5EAD7' },
];

export function AppProvider({ children }) {
  const [usuario,  setUsuario]  = useState(null);
  const [materias, setMaterias] = useState(MATERIAS_PADRAO);
  const [tarefas,  setTarefas]  = useState([]);
  const [erroApi,  setErroApi]  = useState(null);

  // ── GET tarefas ao iniciar ────────────────────────────────────────────────
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tarefas`);
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        const data = await res.json();
        // O back retorna o array de tarefas — front só exibe
        if (Array.isArray(data)) setTarefas(data);
      } catch (err) {
        setErroApi('Não foi possível carregar tarefas da API.');
        console.warn('GET /tarefas:', err.message);
      }
    };
    fetchTarefas();
  }, []);

  // ── POST usuário — manda só o que o usuário digitou ──────────────────────
  // O back é responsável por gerar matrícula, id, datas, etc.
  const cadastrarUsuario = async ({ nome, email, senha }) => {
    const res = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    const usuarioSalvo = await res.json();
    // Armazena exatamente o que o back retornou
    setUsuario(usuarioSalvo);
  };

  // ── POST tarefa — manda os dados do formulário ───────────────────────────
  const adicionarTarefa = async (tarefa) => {
    const res = await fetch(`${API_BASE_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa),
    });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    const tarefaSalva = await res.json();
    // Adiciona na lista local o que o back confirmou
    setTarefas((prev) => [...prev, tarefaSalva]);
  };

  const adicionarMateria = (materia) => {
    setMaterias((prev) => [...prev, { ...materia, id: String(Date.now()) }]);
  };

  return (
    <AppContext.Provider value={{
      usuario,
      cadastrarUsuario,
      materias,
      adicionarMateria,
      tarefas,
      adicionarTarefa,
      erroApi,
    }}>
      {children}
    </AppContext.Provider>
  );
}
