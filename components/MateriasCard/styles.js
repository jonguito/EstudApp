import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    width: '47%',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  icone: {
    fontSize: 36,
    marginBottom: 10,
  },
  nome: {
    color: '#1A1D3B',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF5A5F',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
