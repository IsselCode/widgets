# IsselCaptionButton

IconButton compacto con tooltip, foco y tamaño configurables.

**Categoría:** Escritorio. **Uso:** Acciones de caption en escritorio; aumenta el tamaño para táctil.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/desktop/issel_caption_button.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselCaptionButton({
    super.key,
    required this.icon,
    required this.tooltip,
    this.onPressed,
    this.color,
    this.size = 28,
    this.iconSize = 20,
    this.focusNode,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `icon` | `Widget` | Sí | `—` |  |
| `tooltip` | `String` | Sí | `—` |  |
| `onPressed` | `VoidCallback?` | No | `null` |  |
| `color` | `Color?` | No | `null` |  |
| `size` | `double` | No | `28` |  |
| `iconSize` | `double` | No | `20` |  |
| `focusNode` | `FocusNode?` | No | `null` |  |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_caption_button_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget captionButtonExample(VoidCallback onClose) => IsselCaptionButton(
      icon: const Icon(Icons.close),
      tooltip: 'Cerrar panel',
      onPressed: onClose,
    );
```

## Comportamiento y límites

- icon recibe Widget, no IconData. tooltip es requerido y onPressed admite null para deshabilitar.
- size predeterminado es 28 e iconSize 20. El radio es 6 y el color por defecto primary.
- El FocusNode externo pertenece a su dueño. El botón utiliza comportamiento de foco/teclado Material.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
