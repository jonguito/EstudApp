import { StyleSheet } from 'react-native';

const BLUE = '#4B5FFA';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
  },
  linhas: { flex: 1 },
  titulo: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  descricao: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  horarioContainer: {
    alignItems: 'center',
    marginLeft: 8,
  },
  clockIcon: { fontSize: 14 },
  horario: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
});
