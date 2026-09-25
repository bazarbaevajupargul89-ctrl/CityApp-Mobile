import React, { useState, useEffect } from 'react';
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
import { locales } from '../src/locales';
import { apiService } from '../src/services/api';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const lang = 'ru';
  const t = locales[lang];
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedReels, setLikedReels] = useState({});

  useEffect(() => {
    loadReels();
  }, []);

  const loadReels = async () => {
    setLoading(true);
    try {
      const data = await apiService.getReels();
      setReels(data);
    } catch (error) {
      console.error('Error loading reels:', error);
    }
    setLoading(false);
  };

  const toggleLike = async (reelId) => {
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));

    try {
      if (!likedReels[reelId]) {
        await apiService.addLike(reelId, 'user-id');
      } else {
        await apiService.removeLike(reelId, 'user-id');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (loading) {
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
      </View>

      <ScrollView pagingEnabled showsVerticalScrollIndicator={false}>
        {reels.map((item) => (
          <LinearGradient
            key={item.id}
            colors={[item.colorA, item.colorB, '#0b1020']}
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
                    <Text style={styles.user}>{item.user}</Text>
                    <Text style={styles.handle}>{item.handle}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.bottomContent}>
                <View style={styles.textBlock}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.meta}>🎵 {item.music}</Text>
                </View>

                <View style={styles.sideColumn}>
                  <TouchableOpacity
                    style={styles.iconBox}
                    onPress={() => toggleLike(item.id)}
                  >
                    <Text style={styles.icon}>
                      {likedReels[item.id] ? '♥' : '♡'}
                    </Text>
                    <Text style={styles.counter}>
                      {item.likes.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBox}>
                    <Text style={styles.icon}>💬</Text>
                    <Text style={styles.counter}>{item.comments}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  logo: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 16,
  },
  tab: {
    color: '#cbd5e1',
    fontSize: 15,
    opacity: 0.7,
  },
  tabActive: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  reel: {
    height,
    width: '100%',
    justifyContent: 'space-between',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 100,
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(15,23,42,0.38)',
    borderRadius: 999,
    paddingRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  user: {
    color: '#fff',
    fontWeight: '700',
  },
  handle: {
    color: '#e2e8f0',
    fontSize: 12,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textBlock: {
    flex: 1,
    paddingRight: 14,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  meta: {
    color: '#f3f4f6',
    fontSize: 14,
  },
  sideColumn: {
    alignItems: 'center',
    gap: 18,
  },
  iconBox: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  counter: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
