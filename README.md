Symfony Expression Editor Web Component
---

### What

Enhance regular `<textarea>` element with linting, syntax highlighting, autocompletion etc.
Contains styles so that it looks like built-in **Bootstrap 5.3** component. Editor styles are reactive to `data-bs-theme` attributes.

### Why

Configuring CodeMirror and making it blend into UI can be tricky

### How to use

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/symfony-expression-editor@0.1.0/+esm"></script>
<textarea class="form-control" is="expression-editor" rows="1">'foobar' starts with 'foo'</textarea>
```

![image](https://github.com/user-attachments/assets/4681f02b-f974-429e-a6df-559c2069ab7c)
