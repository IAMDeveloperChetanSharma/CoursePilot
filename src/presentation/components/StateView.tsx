import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/core/theme';
import PrimaryButton from './PrimaryButton';

type Props = { title: string; message: string; actionLabel?: string; onAction?: () => void };

export default function StateView({ title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? <PrimaryButton title={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing.xl },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, textAlign: 'center' },
  message: { marginTop: spacing.sm, marginBottom: spacing.lg, color: colors.muted, textAlign: 'center', lineHeight: 22 },
});
