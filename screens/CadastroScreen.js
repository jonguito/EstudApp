import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useAppContext } from '../context/AppContext';

const BLUE  = '#4B5FFA';
const DARK  = '#1A1D3B';
const BG    = '#F0F2FF';
const ERROR = '#FF5A5F';
const WHITE = '#ffffff';

const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
const validarSenha = (s) => s.length >= 6;
const validarNome  = (n) => n.trim().split(' ').filter(Boolean).length >= 2;

export default function CadastroScreen({ navigation }) {
  const { cadastrarUsuario, usuario } = useAppContext();

  const [nome,          setNome]          = useState('');
  const [email,         setEmail]         = useState('');
  const [senha,         setSenha]         = useState('');
  const [senhaVisivel,  setSenhaVisivel]  = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [erros,         setErros]         = useState({});

  const validar = () => {
    const e = {};
    if (!validarNome(nome))   e.nome  = 'Informe nome e sobrenome.';
    if (!validarEmail(email)) e.email = 'E-mail inválido.';
    if (!validarSenha(senha)) e.senha = 'Mínimo 6 caracteres.';
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleCadastrar = async () => {
    if (!validar()) return;
    setLoading(true);
    try {
      await cadastrarUsuario({ nome, email, senha });
      Alert.alert(
        '✅ Cadastro realizado!',
        `Bem-vindo(a), ${nome.split(' ')[0]}! Dados salvos na API.`,
        [{ text: 'Ir para Matérias', onPress: () => navigation.navigate('Materias') }]
      );
    } catch (err) {
      // A API falhou mas o usuário foi salvo localmente (veja AppContext)
      Alert.alert(
        '⚠️ Cadastro salvo localmente',
        'Não foi possível conectar à API agora, mas seus dados foram salvos no app. Tente novamente mais tarde.',
        [{ text: 'Continuar', onPress: () => navigation.navigate('Materias') }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>📚</Text>
        </View>
        <Text style={styles.titulo}>EstudApp</Text>
        <Text style={styles.subtitulo}>Crie sua conta para comecar</Text>

        {usuario && (
          <View style={styles.jaLogado}>
            <Text style={styles.jaLogadoText}>
              ✅ Logado como {usuario.nome.split(' ')[0]}
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo *</Text>
          <TextInput
            style={[styles.input, erros.nome && styles.inputErro]}
            placeholder="Ex: Maria Silva"
            placeholderTextColor="#aaa"
            value={nome}
            onChangeText={(t) => { setNome(t); setErros((e) => ({ ...e, nome: null })); }}
            autoCapitalize="words"
          />
          {erros.nome ? <Text style={styles.erroText}>{erros.nome}</Text> : null}

          <Text style={styles.label}>E-mail *</Text>
          <TextInput
            style={[styles.input, erros.email && styles.inputErro]}
            placeholder="exemplo@email.com"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(t) => { setEmail(t); setErros((e) => ({ ...e, email: null })); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {erros.email ? <Text style={styles.erroText}>{erros.email}</Text> : null}

          <Text style={styles.label}>Senha *</Text>
          <View style={styles.senhaContainer}>
            <TextInput
              style={[styles.inputSenha, erros.senha && styles.inputErro]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={(t) => { setSenha(t); setErros((e) => ({ ...e, senha: null })); }}
              secureTextEntry={!senhaVisivel}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setSenhaVisivel((v) => !v)}
            >
              <Text style={styles.eyeIcon}>{senhaVisivel ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
          {erros.senha ? <Text style={styles.erroText}>{erros.senha}</Text> : null}

          <TouchableOpacity
            style={[styles.btnCadastrar, loading && styles.btnDisabled]}
            onPress={handleCadastrar}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Cadastrar</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Materias')}>
            <Text style={styles.linkText}>Ja tenho cadastro -</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: BLUE, alignItems: 'center', paddingBottom: 40, paddingTop: 30 },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFD166', alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 12, elevation: 8 },
  logoEmoji: { fontSize: 48 },
  titulo: { color: WHITE, fontSize: 32, fontWeight: '900', letterSpacing: 1.5 },
  subtitulo: { color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 28, marginTop: 4 },
  jaLogado: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 16 },
  jaLogadoText: { color: WHITE, fontSize: 13 },
  form: { width: '88%', backgroundColor: WHITE, borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 },
  label: { color: DARK, fontWeight: '600', fontSize: 13, marginBottom: 6, marginTop: 14 },
  input: { backgroundColor: BG, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 15, color: DARK, borderWidth: 1.5, borderColor: 'transparent' },
  inputErro: { borderColor: ERROR },
  senhaContainer: { flexDirection: 'row', alignItems: 'center' },
  inputSenha: { flex: 1, backgroundColor: BG, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 15, color: DARK, borderWidth: 1.5, borderColor: 'transparent' },
  eyeBtn: { position: 'absolute', right: 14, padding: 4 },
  eyeIcon: { fontSize: 18 },
  erroText: { color: ERROR, fontSize: 12, marginTop: 4, marginLeft: 4 },
  btnCadastrar: { backgroundColor: BLUE, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 24, shadowColor: BLUE, shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: WHITE, fontWeight: '800', fontSize: 16, letterSpacing: 0.5 },
  linkText: { color: BLUE, textAlign: 'center', marginTop: 16, fontWeight: '600', fontSize: 14 },
});
