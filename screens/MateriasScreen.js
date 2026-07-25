import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { useAppContext, API_BASE_URL } from '../context/AppContext';
import MateriasCard from '../components/MateriasCard';
import PickerModal from '../components/PickerModal';

const BLUE = '#4B5FFA';
const DARK = '#1A1D3B';

const CATEGORIAS = [
  { label: 'Todas',     value: 'Todas'     },
  { label: 'Exatas',    value: 'Exatas'    },
  { label: 'Humanas',   value: 'Humanas'   },
  { label: 'Linguagens',value: 'Linguagens'},
];

const CATEGORIA_MAP = {
  Matemática: 'Exatas', Física: 'Exatas', Química: 'Exatas',
  História: 'Humanas', Geografia: 'Humanas', Filosofia: 'Humanas',
  Português: 'Linguagens', Inglês: 'Linguagens', Literatura: 'Linguagens',
};
const getCat = (nome) => CATEGORIA_MAP[nome] || 'Humanas';

export default function MateriasScreen({ navigation }) {
  const { materias, tarefas } = useAppContext();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [busca,   setBusca]   = useState('');
  const [loading, setLoading] = useState(true);
  const [erroApi, setErroApi] = useState(null);

  const fetchDados = useCallback(async () => {
    setLoading(true);
    setErroApi(null);
    try {
      const res = await fetch(`${API_BASE_URL}/tarefas`);
      if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
    } catch (err) {
      setErroApi('Dados locais — API indisponível.');
      console.warn('GET /tarefas:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDados(); }, [fetchDados]);

  const materiasComContagem = materias.map((m) => ({
    ...m,
    tarefas: tarefas.filter((t) => t.materiaId === m.id).length,
  }));

  const materiasFiltradas = materiasComContagem.filter((m) => {
    const passaCat  = categoriaSelecionada === 'Todas' || getCat(m.nome) === categoriaSelecionada;
    const passaBusca = m.nome.toLowerCase().includes(busca.toLowerCase());
    return passaCat && passaBusca;
  });

  const renderItem = ({ item }) => (
    <MateriasCard
      materia={item}
      onPress={() => navigation.navigate('AdicionarTarefa', { materiaId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      {erroApi ? (
        <TouchableOpacity style={styles.erroBanner} onPress={fetchDados}>
          <Text style={styles.erroBannerText}>⚠️ {erroApi} Toque para tentar novamente.</Text>
        </TouchableOpacity>
      ) : null}

      {/* Busca */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar matéria..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtro com PickerModal (JS puro, sem módulo nativo) */}
      <View style={styles.pickerRow}>
        <Text style={styles.pickerLabel}>Categoria:</Text>
        <View style={{ flex: 1 }}>
          <PickerModal
            items={CATEGORIAS}
            selectedValue={categoriaSelecionada}
            onValueChange={(val) => setCategoriaSelecionada(val)}
          />
        </View>
      </View>

      <Text style={styles.contador}>
        {materiasFiltradas.length} matéria{materiasFiltradas.length !== 1 ? 's' : ''} encontrada{materiasFiltradas.length !== 1 ? 's' : ''}
      </Text>

      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={materiasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma matéria encontrada.</Text>}
          showsVerticalScrollIndicator={false}
          onRefresh={fetchDados}
          refreshing={loading}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AdicionarTarefa')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+ Lista de Matérias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLUE, paddingHorizontal: 20, paddingTop: 16 },
  erroBanner: { backgroundColor: 'rgba(255,90,95,0.25)', borderRadius: 10, padding: 10, marginBottom: 12 },
  erroBannerText: { color: '#FFD0D0', fontSize: 12, textAlign: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', fontSize: 15 },
  pickerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 10 },
  pickerLabel: { color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: 13 },
  contador: { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginBottom: 10 },
  row: { justifyContent: 'space-between' },
  listContent: { paddingBottom: 100 },
  emptyText: { color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 40, fontSize: 15 },
  fab: { position: 'absolute', bottom: 24, left: 20, right: 20, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 },
  fabText: { color: BLUE, fontWeight: '800', fontSize: 15 },
});
