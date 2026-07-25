import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function MateriasCard({ materia, onPress }) {
  const { nome, icone, cor, tarefas } = materia;
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cor }]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <Text style={styles.icone}>{icone}</Text>
      <Text style={styles.nome}>{nome}</Text>
      {tarefas > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{tarefas}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
