import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '@/core/theme';

type Props = { title: string; onPress: () => void; loading?: boolean; disabled?: boolean };

export default function PrimaryButton({ title, onPress, loading = false, disabled = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.button, (disabled || loading) && styles.disabled, pressed && styles.pressed]}
    >
      {loading ? <ActivityIndicator color={colors.surface} /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  text: { color: colors.surface, fontSize: 16, fontWeight: '700' },
  disabled: { opacity: 0.55 },
  pressed: { transform: [{ scale: 0.99 }] },
});
