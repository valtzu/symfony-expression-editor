Symfony Expression Editor Web Component
---

Enhance regular `<textarea>` element with linting, syntax highlighting, autocompletion etc.
Contains styles so that it looks like built-in **Bootstrap 5.3** component. Editor styles are reactive to `data-bs-theme` attributes.

## How to use

### Directly from frontend

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script type="module" src="https://esm.sh/symfony-expression-editor"></script>
<textarea class="form-control" is="expression-editor" rows="1">'foobar' starts with 'foo'</textarea>
```

![image](https://github.com/user-attachments/assets/4681f02b-f974-429e-a6df-559c2069ab7c)

_(picture above is from [example.html](example.html))_

### Full Symfony example

```bash
symfony new my-project # or composer create-project my-project
cd my-project
composer require twig asset-mapper form
bin/console importmap:require 'bootstrap/dist/css/bootstrap.min.css@5.3.3' 'symfony-expression-editor@1.0.0'
```

#### Add these to `assets/app.js`:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'symfony-expression-editor';
```

#### `src/Controller/MyController.php`

```php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Routing\Attribute\Route;

class MyController extends AbstractController
{
    #[Route('/')]
    public function index()
    {
        return $this->render('form.html.twig', [
            'expressionForm' => $this->createForm(FormType::class)
                ->add('expression', TextareaType::class, [
                    'attr' => [
                        'is' => 'expression-editor',
                        'data-config' => json_encode([
                            'identifiers' => [
                                ['name' => 'foo'],
                                ['name' => 'bar'],
                            ]
                        ]),  
                    ],
                ])
        ]);
    }
}
```

#### `templates/form.html.twig`

```twig
{% extends 'base.html.twig' %}
{% block body %}
    <div class="m-3">
    {{ form(expressionForm) }}
    </div>
{% endblock %}
```
#### Result

<img width="355" height="119" alt="image" src="https://github.com/user-attachments/assets/3f973fd7-4e8a-4c5f-9b22-577ccfba1a12" />
