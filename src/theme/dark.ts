import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import bootstrap from "./bootstrap";

const darkTheme = EditorView.theme({
    '&.cm-focused .cm-selectionBackground': {
        backgroundColor: '#214181 !important',
    },

    '&.cm-focused': {
        borderColor: '#86b7fe !important',
        boxShadow: '0 0 0 .25rem rgba(13, 110, 253, .25)',
    },

    '.cm-activeLine, .cm-activeLineGutter': {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    },
}, { dark: true });

const darkHighlight = HighlightStyle.define([
    { tag: t.keyword, color: '#d26f15' },
    { tag: t.number, color: '#6aa8cc' },
    { tag: t.variableName, color: '#9675a7', fontWeight: 'bold' },
    { tag: t.function(t.variableName), color: '#fcc46c' },
    { tag: t.function(t.propertyName), color: '#fcc46c' },
    { tag: t.typeName, color: '#C792EA' },
    { tag: t.string, color: '#85a75b' },
    { tag: t.comment, color: '#808080' },
    { tag: t.operator, color: '#EEEEEE' },
]);

export default [
    bootstrap,
    darkTheme,
    syntaxHighlighting(darkHighlight),
];
