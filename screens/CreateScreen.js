import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { locales } from '../src/locales';

const CreateScreen = () => {
  const lang = 'ru';
  const t = locales[lang];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.cameraTitle}</Text>
      <Text style={styles.sub}>{t.createPrompt}</Text>

      <TouchableOpacity style={styles.recordBtn}>
        <Text style={styles.recordText}>●</Text>
      </TouchableOpacity>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.action}>
          <Text style={styles.actionText}>{t.video}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <Text style={styles.actionText}>{t.audio}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <Text style={styles.actionText}>{t.effects}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryText}>{t.next}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },
  sub: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  recordBtn: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#fca5a5',
    marginBottom: 30,
  },
  recordText: {
    color: '#fff',
    fontSize: 52,
    lineHeight: 60,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  action: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#8b5cf6',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default CreateScreen;
