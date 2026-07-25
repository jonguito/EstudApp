import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, Platform, ActivityIndicator, KeyboardAvoidingView,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import TarefaItem from '../components/TarefaItem';
import PickerModal from '../components/PickerModal';

const BLUE  = '#4B5FFA';
const DARK  = '#1A1D3B';
const WHITE = '#ffffff';

const DIAS = [
  { num: '19', dia: 'SEG' },
  { num: '20', dia: 'TER' },
  { num: '21', dia: 'QUA' },
  { num: '22', dia: 'QUI' },
  { num: '23', dia: 'SEX' },
];

export default function AdicionarTarefaScreen({ navigation, route }) {
  const { materias, tarefas, adicionarTarefa } = useAppContext();

  const materiaInicial = route?.params?.materiaId || (materias[0]?.id ?? '');

  const [titulo,         setTitulo]   = useState('');
  const [descricao,      setDescricao]= useState('');
  const [materiaId,      setMateriaId]= useState(materiaInicial);
  const [horario,        setHorario]  = useState('');
  const [diaSelecionado, setDiaSel]   = useState('19');
  const [loading,        setLoading]  = useState(false);
  const [erros,          setErros]    = useState({});

  // Items formatados para o PickerModal
  const materiaItems = materias.map((m) => ({
    label: `${m.icone} ${m.nome}`,
    value: m.id,
  }));

  const validar = () => {
    const e = {};
    if (!titulo.trim())                  e.titulo  = 'Informe o título da tarefa.';
    if (!materiaId)                      e.materia = 'Selecione uma matéria.';
    if (!/^\d{2}:\d{2}$/.test(horario)) e.horario = 'Horário inválido (ex: 14:30).';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = async () => {
    if (!validar()) return;
    setLoading(true);
    try {
      await adicionarTarefa({ titulo: titulo.trim(), descricao: descricao.trim(), materiaId, horario, data: diaSelecionado });
      Alert.alert('✅ Tarefa salva!', `"${titulo}" foi adicionada.`, [{
        text: 'OK',
        onPress: () => { setTitulo(''); setDescricao(''); setHorario(''); },
      }]);
    } catch (err) {
      Alert.alert('❌ Erro ao salvar', `Não foi possível salvar na API: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const tarefasDoDia = tarefas.filter((t) => t.data === diaSelecionado);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Calendário semanal */}
        <View style={styles.calendarRow}>
          {DIAS.map(({ num, dia }) => {
            const ativo = num === diaSelecionado;
            return (
              <TouchableOpacity
                key={num}
                style={[styles.diaBtn, ativo && styles.diaBtnAtivo]}
                onPress={() => setDiaSel(num)}
              >
                <Text style={[styles.diaNum,  ativo && styles.diaNumAtivo]}>{num}</Text>
                <Text style={[styles.diaNome, ativo && styles.diaNomeAtivo]}>{dia}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {tarefasDoDia.length > 0
          ? tarefasDoDia.map((t) => <TarefaItem key={t.id} tarefa={t} onPress={() => {}} />)
          : <Text style={styles.semTarefas}>Nenhuma tarefa para este dia.</Text>
        }

        <View style={styles.form}>
          <Text style={styles.formTitulo}>Nova Tarefa</Text>

          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={[styles.input, erros.titulo && styles.inputErro]}
            placeholder="Ex: Estudar equações"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={titulo}
            onChangeText={(t) => { setTitulo(t); setErros((e) => ({ ...e, titulo: null })); }}
          />
          {erros.titulo ? <Text style={styles.erroText}>{erros.titulo}</Text> : null}

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.inputMulti]}
            placeholder="Detalhes opcionais..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
          />

          {/* Seleção de Matéria com PickerModal (JS puro) */}
          <Text style={styles.label}>Matéria *</Text>
          <PickerModal
            items={materiaItems}
            selectedValue={materiaId}
            onValueChange={(val) => { setMateriaId(val); setErros((e) => ({ ...e, materia: null })); }}
            placeholder="Selecione uma matéria"
          />
          {erros.materia ? <Text style={styles.erroText}>{erros.materia}</Text> : null}

          <Text style={styles.label}>Horário * (HH:MM)</Text>
          <TextInput
            style={[styles.input, erros.horario && styles.inputErro]}
            placeholder="Ex: 14:30"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={horario}
            onChangeText={(t) => { setHorario(t); setErros((e) => ({ ...e, horario: null })); }}
            keyboardType="numbers-and-punctuation"
            maxLength={5}
          />
          {erros.horario ? <Text style={styles.erroText}>{erros.horario}</Text> : null}

          <TouchableOpacity
            style={[styles.btnSalvar, loading && styles.btnDisabled]}
            onPress={handleSalvar}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? <ActivityIndicator color={BLUE} /> : <Text style={styles.btnText}>Adicionar Matéria</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLUE, paddingHorizontal: 20, paddingTop: 16 },
  calendarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  diaBtn: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)' },
  diaBtnAtivo: { backgroundColor: WHITE },
  diaNum: { color: 'rgba(255,255,255,0.7)', fontWeight: '700', fontSize: 16 },
  diaNumAtivo: { color: BLUE },
  diaNome: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2 },
  diaNomeAtivo: { color: BLUE, fontWeight: '700' },
  semTarefas: { color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 20, fontSize: 13 },
  form: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 20, marginTop: 10 },
  formTitulo: { color: WHITE, fontWeight: '800', fontSize: 18, marginBottom: 10 },
  label: { color: 'rgba(255,255,255,0.75)', fontWeight: '600', fontSize: 13, marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 16, fontSize: 15, color: WHITE, borderWidth: 1.5, borderColor: 'transparent' },
  inputMulti: { minHeight: 70, textAlignVertical: 'top' },
  inputErro: { borderColor: '#FF5A5F' },
  erroText: { color: '#FF8C8C', fontSize: 12, marginTop: 4, marginLeft: 4 },
  btnSalvar: { backgroundColor: WHITE, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 24, elevation: 4 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: BLUE, fontWeight: '800', fontSize: 16 },
});

