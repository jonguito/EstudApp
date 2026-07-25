import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useAppContext } from '../context/AppContext';

const BLUE  = '#4B5FFA';
const DARK  = '#1A1D3B';
const WHITE = '#ffffff';

function InfoCard({ label, valor, emoji }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoEmoji}>{emoji}</Text>
      <View style={styles.infoTexts}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValor}>{valor ?? '—'}</Text>
      </View>
    </View>
  );
}

function StatCard({ label, valor, cor }) {
  return (
    <View style={[styles.statCard, { borderTopColor: cor }]}>
      <Text style={[styles.statValor, { color: cor }]}>{valor}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function PerfilScreen({ navigation }) {
  const { usuario, materias, tarefas } = useAppContext();

  if (!usuario) {
    return (
      <View style={styles.semUsuario}>
        <Text style={styles.semUsuarioEmoji}>👤</Text>
        <Text style={styles.semUsuarioText}>Nenhum usuario cadastrado ainda.</Text>
        <TouchableOpacity
          style={styles.btnIrCadastro}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.btnIrCadastroText}>Ir para Cadastro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Exibe exatamente o que o back retornou — sem inventar campos
  const { nome, email } = usuario;

  const iniciaisNome = nome
    ? nome.split(' ').slice(0, 2).map((n) => n[0].toUpperCase()).join('')
    : '?';

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* Avatar */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{iniciaisNome}</Text>
        </View>
        <Text style={styles.nomeText}>{nome}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsRow}>
        <StatCard label="Matérias" valor={materias.length}  cor="#FFD166" />
        <StatCard label="Tarefas"  valor={tarefas.length}   cor="#06D6A0" />
      </View>

      {/* Campos que o back retornar — renderiza só os que existirem */}
      <Text style={styles.secTitulo}>Informacoes</Text>
      <View style={styles.cardsContainer}>
        <InfoCard emoji="👤" label="Nome"       valor={usuario.nome}        />
        <InfoCard emoji="📧" label="E-mail"     valor={usuario.email}       />
        {/* Os campos abaixo só aparecem se o back os retornar */}
        {usuario.matricula   && <InfoCard emoji="🎫" label="Matrícula"      valor={usuario.matricula}   />}
        {usuario.dataEntrada && <InfoCard emoji="📅" label="Data de Entrada" valor={usuario.dataEntrada} />}
        {usuario.anoLetivo   && <InfoCard emoji="📆" label="Ano Letivo"      valor={String(usuario.anoLetivo)} />}
        {usuario.curso       && <InfoCard emoji="🎓" label="Curso"           valor={usuario.curso}       />}
      </View>

      {/* Matérias */}
      <Text style={styles.secTitulo}>Materias Matriculadas</Text>
      <View style={styles.materiasResumo}>
        {materias.map((m) => (
          <View key={m.id} style={[styles.materiaChip, { backgroundColor: m.cor }]}>
            <Text style={styles.materiaChipText}>{m.icone} {m.nome}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.btnPerfil} activeOpacity={0.85}>
        <Text style={styles.btnPerfilText}>Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLUE, paddingHorizontal: 20, paddingTop: 16 },
  semUsuario: { flex: 1, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', padding: 30 },
  semUsuarioEmoji: { fontSize: 60, marginBottom: 16 },
  semUsuarioText: { color: WHITE, fontSize: 16, textAlign: 'center', marginBottom: 24, opacity: 0.8 },
  btnIrCadastro: { backgroundColor: WHITE, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32 },
  btnIrCadastroText: { color: BLUE, fontWeight: '700', fontSize: 15 },
  header: { alignItems: 'center', paddingVertical: 20 },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText: { color: WHITE, fontSize: 32, fontWeight: '800' },
  nomeText: { color: WHITE, fontSize: 22, fontWeight: '800' },
  emailText: { color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 10 },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 16, alignItems: 'center', borderTopWidth: 3 },
  statValor: { fontSize: 26, fontWeight: '900' },
  statLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 4, fontWeight: '600' },
  secTitulo: { color: WHITE, fontWeight: '800', fontSize: 16, marginBottom: 12, marginTop: 4 },
  cardsContainer: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 6, marginBottom: 24 },
  infoCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)' },
  infoEmoji: { fontSize: 22, marginRight: 14 },
  infoTexts: { flex: 1 },
  infoLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValor: { color: WHITE, fontSize: 15, fontWeight: '600', marginTop: 2 },
  materiasResumo: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 30 },
  materiaChip: { borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14 },
  materiaChipText: { color: DARK, fontWeight: '700', fontSize: 13 },
  btnPerfil: { backgroundColor: WHITE, borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
  btnPerfilText: { color: BLUE, fontWeight: '800', fontSize: 16 },
});
