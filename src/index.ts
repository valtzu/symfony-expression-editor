import { basicSetup } from "./setup";
import { expressionlanguage } from "@valtzu/codemirror-lang-el";
import { acceptCompletion } from "@codemirror/autocomplete";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
import { Compartment, EditorState, Extension } from "@codemirror/state";
import dark from "./theme/dark";
import light from "./theme/light";

const getTheme = (el: HTMLElement): Extension => ({ light, dark })[el.dataset.bsTheme || 'light'];

const mutationObserver = new MutationObserver(changes => changes
  .map(mutation => mutation.target)
  .filter(mutationTarget => mutationTarget instanceof HTMLElement)
  .map(themeContainer => editors.get(themeContainer).forEach(editor => setTheme(themeContainer, editor)))
);
const setTheme = (themeContainer: HTMLElement, editor: EditorView) => editor.dispatch({ effects: themes.get(editor).reconfigure(getTheme(themeContainer)) });
const themes = new WeakMap<EditorView, Compartment>();
const editors = new WeakMap<HTMLElement, Set<EditorView>>();

export class ExpressionEditor extends HTMLTextAreaElement {
  private readonly dom: HTMLElement;
  private readonly editorView: EditorView;
  private readonly theme: Compartment;
  private readonly instanceStyles: Compartment;

  private get editableExtension(): Extension {
    return [
      EditorView.editable.of(!this.readOnly && !this.disabled),
      EditorState.readOnly.of(this.readOnly || this.disabled),
    ];
  }

  constructor() {
    super();
    this.theme = new Compartment();
    this.instanceStyles = new Compartment();
    const readonly = new Compartment();

    (new MutationObserver(() => this.editorView.dispatch({ effects: readonly.reconfigure(this.editableExtension)})))
      .observe(this, { attributes: true, attributeFilter: ['disabled', 'readonly'] });

    this.dom = document.createElement('div');
    this.dom.style.display = 'contents';
    this.dom.className = this.className;
    const shadow = this.dom.attachShadow({ mode: "closed" });

    this.editorView = new EditorView({
      extensions: [
        readonly.of(this.editableExtension),
        this.instanceStyles.of(EditorView.theme({})),
        basicSetup({
          useLineNumbers: JSON.parse(this.dataset.lineNumbers || 'false'),
        }),
        this.theme.of(light),
        keymap.of([...defaultKeymap, { key: "Tab", run: acceptCompletion }]),
        expressionlanguage(JSON.parse(this.dataset.config || '{}')),
        EditorView.updateListener.of((e: ViewUpdate) => {
          if (e.docChanged) {
            this.value = e.state.doc.toString();
          }
        }),
      ],
      root: shadow,
      parent: shadow,
      doc: this.value.trim(),
    });
    themes.set(this.editorView, this.theme);
  }

  connectedCallback() {
    const themeContainer: HTMLElement = this.closest('[data-bs-theme]') || document.documentElement;

    if (!editors.has(themeContainer)) {
      editors.set(themeContainer, new Set());
      mutationObserver.observe(themeContainer, { attributes: true, attributeFilter: ["data-bs-theme"] });
    }

    if (editors.get(themeContainer).has(this.editorView)) {
      return;
    }

    setTheme(themeContainer, this.editorView);

    editors.get(themeContainer).add(this.editorView);

    this.editorView.dispatch({
      effects: this.instanceStyles.reconfigure(EditorView.theme({
        '&': { minHeight: this.getBoundingClientRect().height + 'px' },
        '& .cm-gutter': { minHeight: `${this.getBoundingClientRect().height - 2}px` },
      })),
    });
    this.replaceWith(this.dom);
    this.dom.appendChild(this);
  }
}

customElements.define('expression-editor', ExpressionEditor, { extends: 'textarea' });
