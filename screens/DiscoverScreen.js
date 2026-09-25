import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { locales } from '../src/locales';

const tags = ['Fashion', 'Travel', 'Tech', 'Food', 'Music', 'Life'];

export default function DiscoverScreen() {
  const lang = 'ru';
  const t = locales[lang];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.discoverTitle}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsWrap}>
        {tags.map((tag, index) => (
          <TouchableOpacity key={tag} style={[styles.chip, index === 0 && styles.chipActive]}>
            <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.grid}>
        <LinearGradient colors={['#f59e0b', '#ef4444']} style={styles.card}>
          <Text style={styles.cardText}>Trend 1</Text>
        </LinearGradient>
        <LinearGradient colors={['#60a5fa', '#8b5cf6']} style={styles.card}>
          <Text style={styles.cardText}>Trend 2</Text>
        </LinearGradient>
        <LinearGradient colors={['#34d399', '#10b981']} style={styles.card}>
          <Text style={styles.cardText}>Trend 3</Text>
        </LinearGradient>
        <LinearGradient colors={['#f472b6', '#ec4899']} style={styles.card}>
          <Text style={styles.cardText}>Trend 4</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    paddingHorizontal: 18,
    paddingTop: 60,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  chipsWrap: { marginBottom: 18 },
  chip: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipActive: { backgroundColor: '#f97316', borderColor: '#f97316' },
  chipText: { color: '#e2e8f0', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14 },
  card: { width: '48%', height: 180, borderRadius: 20, padding: 16, justifyContent: 'flex-end' },
  cardText: { color: '#fff', fontSize: 22, fontWeight: '700' },
});
