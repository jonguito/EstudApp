import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal, FlatList,
  StyleSheet, SafeAreaView,
} from 'react-native';

const BLUE = '#4B5FFA';
const DARK = '#1A1D3B';

export default function PickerModal({ items, selectedValue, onValueChange, placeholder, style }) {
  const [visible, setVisible] = useState(false);
  const itemSel = items.find((i) => i.value === selectedValue);
  const label   = itemSel ? itemSel.label : placeholder || 'Selecione...';

  return (
    <>
      <TouchableOpacity
        style={[styles.botao, style]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.botaoText} numberOfLines={1}>{label}</Text>
        <Text style={styles.seta}>▾</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)} />
        <SafeAreaView style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Selecione</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.fechar}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => String(item.value)}
            renderItem={({ item }) => {
              const ativo = item.value === selectedValue;
              return (
                <TouchableOpacity
                  style={[styles.opcao, ativo && styles.opcaoAtiva]}
                  onPress={() => { onValueChange(item.value); setVisible(false); }}
                >
                  <Text style={[styles.opcaoText, ativo && styles.opcaoTextAtiva]}>{item.label}</Text>
                  {ativo && <Text style={styles.check}>✓</Text>}
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  botao: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, borderWidth: 1.5, borderColor: 'transparent' },
  botaoText: { flex: 1, color: '#fff', fontSize: 15 },
  seta: { color: 'rgba(255,255,255,0.6)', fontSize: 16, marginLeft: 8 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '55%', paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: DARK },
  fechar: { fontSize: 18, color: '#999' },
  opcao: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  opcaoAtiva: { backgroundColor: '#F0F2FF' },
  opcaoText: { flex: 1, fontSize: 15, color: DARK },
  opcaoTextAtiva: { color: BLUE, fontWeight: '700' },
  check: { color: BLUE, fontSize: 16, fontWeight: '700' },
});

