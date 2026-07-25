import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAppContext } from '../context/AppContext';

const MENU_ITEMS = [
  { label: 'Cadastro',         icon: '👤', route: 'Cadastro'      },
  { label: 'Lista de Matérias',icon: '📚', route: 'Materias'      },
  { label: 'Adicionar Tarefa', icon: '➕', route: 'AdicionarTarefa'},
  { label: 'Perfil / Resumo',  icon: '🎓', route: 'Perfil'        },
];

export default function DrawerContent({ navigation, state }) {
  const { usuario } = useAppContext();
  const activeRoute = state?.routes[state.index]?.name;

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      {/* Cabeçalho do Drawer */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>📚</Text>
        </View>
        <Text style={styles.appName}>EstudApp</Text>
        {usuario && (
          <Text style={styles.userName} numberOfLines={1}>
            {usuario.nome}
          </Text>
        )}
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Itens do menu */}
      <View style={styles.menuList}>
        {MENU_ITEMS.map(({ label, icon, route }) => {
          const active = activeRoute === route;
          return (
            <TouchableOpacity
              key={route}
              style={[styles.menuItem, active && styles.menuItemActive]}
              onPress={() => navigation.navigate(route)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>
                {label}
              </Text>
              {active && <View style={styles.activeBar} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0 • EstudApp 2024</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const BLUE = '#4B5FFA';
const DARK = '#1A1D3B';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK,
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: BLUE,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFD166',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarEmoji: { fontSize: 34 },
  appName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  userName: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  menuItemActive: {
    backgroundColor: 'rgba(75,95,250,0.2)',
  },
  menuIcon: { fontSize: 20, marginRight: 14 },
  menuLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  menuLabelActive: {
    color: '#fff',
    fontWeight: '700',
  },
  activeBar: {
    position: 'absolute',
    right: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 2,
    backgroundColor: BLUE,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
  },
});
