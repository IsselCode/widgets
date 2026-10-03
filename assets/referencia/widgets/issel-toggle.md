# IsselToggle

Interruptor visual booleano controlado por la app.

**Categoría:** Selección. **Uso:** Booleanos cuya etiqueta ya existe en la composición.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_toggle.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselToggle({
    super.key,
    required this.onChanged,
    required this.value,
    this.height = 50,
    this.width = 60,
    this.backColor,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `onChanged` | `ValueChanged<bool>?` | Sí | `—` | Callback invocado con el valor contrario al tocar el interruptor. |
| `value` | `bool` | Sí | `—` | Valor actual del interruptor. |
| `height` | `double` | No | `50` | Altura usada para calcular el tamaño del interruptor. |
| `width` | `double` | No | `60` | Ancho del interruptor. |
| `backColor` | `Color?` | No | `null` | Color de fondo opcional del riel. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_toggle_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget toggleExample(bool value, ValueChanged<bool> onChanged) => Semantics(
      label: 'Recibir avisos',
      toggled: value,
      child: IsselToggle(value: value, onChanged: onChanged),
    );
```

## Comportamiento y límites

- onChanged y value son requeridos; onChanged admite null y bloquea el InkWell.
- height calcula un riel de 65% de ese valor: height: 50 produce un riel de 32.5 px.
- Reconstruye el padre con el booleano entregado. La animación utiliza 200 ms.
- Usa una etiqueta semántica y revisa foco/teclado en esta interacción personalizada. El riel por defecto utiliza surfaceContainer.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
