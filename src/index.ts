import { basicSetup } from "./setup";
import { expressionlanguage } from "@valtzu/codemirror-lang-el";
import { acceptCompletion } from "@codemirror/autocomplete";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
import { Compartment, Extension } from "@codemirror/state";
import dark from "./theme/dark";
import light from "./theme/light";

const getTheme = (el: HTMLElement): Extension => ({light, dark})[el.dataset.bsTheme || 'light'];

const mutationObserver = new MutationObserver(changes => changes
    .map(mutation => mutation.target)
    .filter(mutationTarget => mutationTarget instanceof HTMLElement)
    .map(themeContainer => ({transaction: { effects: themes.get(themeContainer).reconfigure(getTheme(themeContainer)) }, editors: editors.get(themeContainer) }))
    .forEach(({ transaction, editors }) => editors.forEach(editor => editor.dispatch(transaction)))
);

const themes = new WeakMap<HTMLElement, Compartment>();
const editors = new WeakMap<HTMLElement, Set<EditorView>>();

export class ExpressionEditor extends HTMLTextAreaElement {
    private readonly dom: HTMLElement;
    private readonly editorView: EditorView;

    constructor() {
        super();
        const themeContainer: HTMLElement = this.closest('[data-bs-theme]') || document.documentElement;
        if (!themes.has(themeContainer)) {
            mutationObserver.observe(themeContainer, { attributes: true, attributeFilter: ["data-bs-theme"] });
            themes.set(themeContainer, new Compartment());
            editors.set(themeContainer, new Set());
        }

        this.dom = document.createElement('div');
        this.editorView = new EditorView({
            extensions: [
                EditorView.editorAttributes.of({style: `min-height: calc(0.75rem + ${this.rows} * 0.8125 * 1.85rem + 2px); height: calc(0.75rem + ${this.rows} * 0.8125 * 1.85rem + 2px)`}),
                basicSetup({
                    useLineNumbers: JSON.parse(this.dataset.lineNumbers || 'false'),
                }),
                themes.get(themeContainer).of(getTheme(themeContainer)),
                keymap.of([...defaultKeymap, {key: "Tab", run: acceptCompletion}]),
                expressionlanguage(JSON.parse(this.dataset.config || '{}'), [getTheme(themeContainer)]),
                EditorView.updateListener.of((e: ViewUpdate) => {
                    if (e.docChanged) {
                        this.value = e.state.doc.toString();
                    }
                }),
            ],
            parent: this.dom,
            doc: this.value.trim(),
        });
        editors.get(themeContainer).add(this.editorView);
        this.replaceWith(this.dom);
        this.hidden = true;
        this.dom.appendChild(this);
    }
}

customElements.define('expression-editor', ExpressionEditor, { extends: 'textarea' });
