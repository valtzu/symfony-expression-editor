import { EditorView } from "@codemirror/view";

const bootstrap = EditorView.theme({
    '&': {
        backgroundColor: 'var(--bs-body-bg)',
        color: 'var(--bs-body-color)',
        border: 'var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)',
        '--bs-border-width': '1px',
        borderRadius: 'var(--bs-border-radius)',
        fontSize: '0.8125rem !important',
        overflow: 'hidden',
        transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
        resize: 'vertical',
    },

    ':host(.is-invalid) &': {
      borderColor: 'var(--bs-form-invalid-border-color)',
      paddingRight: 'calc(1.5em + .75rem)',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'calc(.75em + .375rem) calc(.75em + .375rem)',
      backgroundPosition: 'top calc(.375em + .1875rem) right calc(.375em + .1875rem)',
    },

    ':host(.form-control-plaintext) &:has(.cm-content[contenteditable=false])': {
      '--bs-body-bg': 'transparent',
      '--bs-border-color': 'transparent',
      'resize': 'none',
    },

    '.cm-line': {
        padding: '0 0.75rem',
    },

    '.cm-content': {
        padding: '0.375rem 0',
        animation: 'fade-to-colors 0.5s ease-out 0s forwards',
    },

    '&:not(.cm-focused) .cm-activeLine, &:not(.cm-focused) .cm-activeLineGutter': {
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
