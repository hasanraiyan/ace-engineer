// src/styles/markdownStyles.js
import { StyleSheet, Platform } from 'react-native';

// Note: This function now needs COLORS passed to it when called
export const getMarkdownStyles = (COLORS) => StyleSheet.create({
    heading1: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 20, marginBottom: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: COLORS.separator, paddingBottom: 8 },
    heading2: { fontSize: 20, fontWeight: '600', color: COLORS.text, marginTop: 16, marginBottom: 10 },
    heading3: { fontSize: 18, fontWeight: '600', color: COLORS.primary, marginTop: 12, marginBottom: 8 },
    body: { fontSize: 16, lineHeight: 24, color: COLORS.text },
    list_item: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5, marginLeft: 10 },
    bullet_list_icon: { color: COLORS.subtleText, marginRight: 10, fontSize: 16, lineHeight: 24, marginTop: Platform.OS === 'ios' ? 1 : 3 },
    ordered_list_icon: { color: COLORS.subtleText, marginRight: 10, fontSize: 16, lineHeight: 24, fontWeight: 'normal', minWidth: 18, textAlign: 'right', marginTop: Platform.OS === 'ios' ? 1 : 3 },
    code_inline: { backgroundColor: COLORS.accentBackground, color: COLORS.primary, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 15 },
    code_block: { backgroundColor: COLORS.background, color: COLORS.text, padding: 15, borderRadius: 8, marginVertical: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 14, borderWidth: 1, borderColor: COLORS.separatorLight },
    link: { color: COLORS.primary, textDecorationLine: 'underline' },
    blockquote: { backgroundColor: COLORS.accentBackground, borderLeftColor: COLORS.primary, borderLeftWidth: 4, paddingLeft: 10, marginLeft: 5, marginVertical: 10, color: COLORS.subtleText },
    hr: { backgroundColor: COLORS.separator, height: StyleSheet.hairlineWidth, marginVertical: 15 }
});