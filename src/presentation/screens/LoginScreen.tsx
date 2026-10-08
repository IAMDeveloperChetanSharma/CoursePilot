import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/presentation/navigation/types';
import { colors, spacing } from '@/core/theme';
import PrimaryButton from '@/presentation/components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('demo@coursepilot.app');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) return setError('Please enter a valid email address.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    setError(null);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    navigation.replace('Dashboard');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.kicker}>COURSEPILOT</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Continue learning from where you left off.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholder="you@example.com" />

        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholder="••••••••" />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton title="Login" onPress={handleLogin} loading={loading} />
        <Text style={styles.demo}>Demo credentials are pre-filled.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: spacing.lg },
  card: { backgroundColor: colors.surface, borderRadius: 20, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  kicker: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: spacing.xs },
  subtitle: { color: colors.muted, lineHeight: 22, marginTop: spacing.xs, marginBottom: spacing.lg },
  label: { color: colors.text, fontSize: 14, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.sm },
  input: { height: 50, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, color: colors.text, backgroundColor: '#FBFCFE' },
  error: { color: colors.danger, marginVertical: spacing.sm, fontWeight: '600' },
  demo: { color: colors.muted, textAlign: 'center', fontSize: 12, marginTop: spacing.md },
});
