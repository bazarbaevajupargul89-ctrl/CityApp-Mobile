import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { query, collection, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../src/firebase';
import { signOut } from 'firebase/auth';
import { locales } from '../src/locales';

const { height } = Dimensions.get('window');

const sampleReels = [
  {
    id: '1',
    user: 'Aru',
    handle: '@aru',
    title: 'Sunset city vibes',
    likes: ['u1', 'u2'],
    comments: [{ userId: 'u1', text: 'Nice' }],
    colorA: '#ff7b72',
    colorB: '#f59e0b',
    music: 'Night Drive',
  },
  {
    id: '2',
    user: 'Mira',
    handle: '@mira',
    title: 'Creative studio',
    likes: ['u1'],
    comments: [{ userId: 'u1', text: 'Cool' }],
    colorA: '#60a5fa',
    colorB: '#8b5cf6',
    music: 'Skyline',
  },
  {
    id: '3',
    user: 'Dias',
    handle: '@dias',
    title: 'Coffee & friends',
    likes: [],
    comments: [],
    colorA: '#34d399',
    colorB: '#10b981',
    music: 'Morning Mood',
  },
];

export default function HomeScreen() {
  const lang = 'ru';
  const t = locales[lang];
  const [reels, setReels] = useState(sampleReels);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'reels'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (data.length > 0) setReels(data);
      } catch (e) {
        console.log('reels load error', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading && reels.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>ReelFlow</Text>
        <View style={styles.tabRow}>
          <Text style={styles.tabActive}>{t.forYou}</Text>
          <Text style={styles.tab}>{t.following}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView pagingEnabled showsVerticalScrollIndicator={false}>
        {reels.map((item) => (
          <LinearGradient
            key={item.id}
            colors={[item.colorA || '#ff7b72', item.colorB || '#f59e0b', '#0b1020']}
            style={styles.reel}
          >
            <View style={styles.overlay}>
              <View style={styles.headerInfo}>
                <View style={styles.profileChip}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                    }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.user}>{item.user || 'User'}</Text>
                    <Text style={styles.handle}>{item.handle || '@user'}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bottomContent}>
                <View style={styles.textBlock}>
                  <Text style={styles.title}>{item.title || 'New Reel'}</Text>
                  <Text style={styles.meta}>🎵 {item.music || 'Music'}</Text>
                </View>

                <View style={styles.sideColumn}>
                  <TouchableOpacity style={styles.iconBox}>
                    <Text style={styles.icon}>♡</Text>
                    <Text style={styles.counter}>{(item.likes || []).length}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBox}>
                    <Text style={styles.icon}>💬</Text>
                    <Text style={styles.counter}>{(item.comments || []).length}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBox}>
                    <Text style={styles.icon}>↗</Text>
                    <Text style={styles.counter}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020' },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 30,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: '#fff', fontWeight: '700', fontSize: 24 },
  tabRow: { flexDirection: 'row', gap: 16 },
  tab: { color: '#cbd5e1', fontSize: 15, opacity: 0.7 },
  tabActive: { color: '#fff', fontSize: 15, fontWeight: '700' },
  logoutText: { color: '#fff', fontSize: 12, opacity: 0.8 },
  reel: { height, width: '100%', justifyContent: 'space-between' },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 100,
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  headerInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(15,23,42,0.38)',
    borderRadius: 999,
    paddingRight: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  user: { color: '#fff', fontWeight: '700' },
  handle: { color: '#e2e8f0', fontSize: 12 },
  bottomContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  textBlock: { flex: 1, paddingRight: 14 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 8 },
  meta: { color: '#f3f4f6', fontSize: 14 },
  sideColumn: { alignItems: 'center', gap: 18 },
  iconBox: { alignItems: 'center' },
  icon: { fontSize: 28 },
  counter: { color: '#fff', fontSize: 12, marginTop: 4, fontWeight: '600' },
});
