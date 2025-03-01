import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { Extension } from "@codemirror/state";
import bootstrap from "./bootstrap";

const lightTheme = EditorView.theme({
    '&.cm-focused .cm-selectionBackground': {
        backgroundColor: '#cce5ff !important', // Light blue selection when focused
    },

    '&.cm-focused': {
        borderColor: '#86b7fe !important',
        boxShadow: '0 0 0 .25rem rgba(0, 123, 255, .25)',
    },

    '.cm-activeLine, .cm-activeLineGutter': {
        backgroundColor: 'rgba(0, 0, 0, .05)',
    },
}, { dark: false });

// Define the highlight style
const lightHighlight = HighlightStyle.define([
    { tag: t.keyword, color: '#0033a0', fontWeight: 'bold' }, // Dark blue keywords
    { tag: t.atom, color: '#d35400' }, // Orange atoms
    { tag: t.number, color: '#d32f2f' }, // Red numbers
    { tag: t.definition(t.name), color: '#007acc' }, // Blue function/class names
    { tag: t.variableName, color: '#2d2d2d' }, // Dark text for variables
    { tag: t.typeName, color: '#0056b3' }, // Blue types
    { tag: t.string, color: '#388e3c' }, // Green strings
    { tag: t.comment, color: '#757575', fontStyle: 'italic' }, // Gray italic comments
    { tag: t.operator, color: '#6a1b9a' }, // Purple operators
]);

export default [
    bootstrap,
    lightTheme,
    syntaxHighlighting(lightHighlight),
];
