import { EditorView } from "@codemirror/view";

const bootstrap = EditorView.theme({
    '&': {
        backgroundColor: 'var(--bs-body-bg)',
        color: 'var(--bs-body-color)',
        border: 'var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important',
        '--bs-border-width': '1px',
        borderRadius: 'var(--bs-border-radius)',
        fontSize: '0.8125rem !important',
        overflow: 'hidden',
        transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
        resize: 'vertical',
    },

    '.cm-line': {
        padding: '0 0.75rem',
    },

    '.cm-content': {
        padding: '0.375rem 0',
        animation: 'fade-to-colors 0.5s ease-out 0s forwards',
    },

    '&:not(.cm-focused) .cm-selectionBackground, &:not(.cm-focused) .cm-activeLine, &:not(.cm-focused) .cm-activeLineGutter': {
        backgroundColor: 'transparent',
    },

    '&.cm-focused': {
        color: 'var(--bs-body-color)',
        backgroundColor: 'var(--bs-body-bg)',
        outline: 0,
        boxShadow: '0 0 0 .25rem rgba(13, 110, 253, .25)',
    },

    '.cm-scroller': {
        overflow: 'auto',
        height: '100%',
        lineHeight: 1.85,
        flexGrow: 1,
        animation: 'fade 0.5s ease-out 0s forwards',
    },

    '.cm-gutters': {
        height: '100% !important',
        color: 'var(--bs-tertiary-color)',
        backgroundColor: 'var(--bs-tertiary-bg)',
    },
    '@keyframes slide-left': { from: { transform: 'translateX(-100%)', opacity: 0 } },
    '@keyframes fade-to-colors': { from: { filter: 'grayscale(100%)' } },
    '@keyframes fade': { from: { opacity: 0 } },
});

export default bootstrap;
