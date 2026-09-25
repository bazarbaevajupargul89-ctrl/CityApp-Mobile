import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../src/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { locales } from '../src/locales';

export default function ProfileScreen() {
  const lang = 'ru';
  const t = locales[lang];
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!auth.currentUser) return;
      const snap = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (snap.exists()) {
        const data = snap.data();
        setUser(data);
        setEditName(data.name || '');
        setEditBio(data.bio || '');
      }
    };

    load();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const saveProfile = async () => {
    if (!auth.currentUser) return;
    const data = { name: editName, bio: editBio };
    await updateDoc(doc(db, 'users', auth.currentUser.uid), data);
    setUser((prev) => ({ ...prev, ...data }));
    setEditMode(false);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#0f172a', '#111827']} style={styles.header}>
        <Image
          source={{
            uri: user?.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.handle}>{t.nick}</Text>
        <Text style={styles.bio}>{user?.bio || t.bio}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>120K</Text>
            <Text style={styles.statLabel}>{t.followers}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8.4M</Text>
            <Text style={styles.statLabel}>{t.likes}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setEditMode(true)}>
            <Text style={styles.primaryText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleLogout}>
            <Text style={styles.secondaryText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>My Videos</Text>
        <View style={styles.videoGrid}>
          <View style={styles.videoCard}>
            <Text style={styles.videoTitle}>Video 1</Text>
            <Text style={styles.videoMeta}>150 likes • 12 comments</Text>
          </View>
          <View style={styles.videoCard}>
            <Text style={styles.videoTitle}>Video 2</Text>
            <Text style={styles.videoMeta}>450 likes • 45 comments</Text>
          </View>
        </View>
      </View>

      <Modal visible={editMode} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#7b8794"
              value={editName}
              onChangeText={setEditName}
            />

            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Bio"
              placeholderTextColor="#7b8794"
              value={editBio}
              onChangeText={setEditBio}
              multiline
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setEditMode(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={saveProfile}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1020' },
  header: {
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f8fafc',
    marginBottom: 16,
  },
  name: { color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: 4 },
  handle: { color: '#8b5cf6', fontSize: 16, marginBottom: 12 },
  bio: { color: '#cbd5e1', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 26,
    flex: 1,
    marginHorizontal: 8,
  },
  statNumber: { color: '#fff', fontSize: 24, fontWeight: '700' },
  statLabel: { color: '#cbd5e1', marginTop: 4 },
  buttonRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
  primaryBtn: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtn: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryText: { color: '#fff', fontWeight: '700' },
  content: { paddingHorizontal: 18, paddingVertical: 20 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  videoGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  videoCard: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  videoTitle: { color: '#fff', fontWeight: '700', marginBottom: 4 },
  videoMeta: { color: '#cbd5e1', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  input: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  modalButtonRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  modalButton: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonPrimary: { backgroundColor: '#8b5cf6' },
  modalButtonText: { color: '#fff', fontWeight: '700' },
});
