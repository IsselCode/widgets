# IsselToggleField

Etiqueta y toggle en una superficie de una línea.

**Categoría:** Selección. **Uso:** Booleanos como Activo, Habilitado o una preferencia breve.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_toggle_field.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselToggleField({
    super.key,
    required this.title,
    required this.value,
    required this.onChanged,
    this.height = 50,
    this.width = 60,
    this.backColor,
    this.valueBackColor,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `title` | `String` | Sí | `—` | Texto mostrado junto al interruptor. |
| `value` | `bool` | Sí | `—` | Valor actual del interruptor. |
| `onChanged` | `ValueChanged<bool>` | Sí | `—` | Callback invocado cuando cambia el valor. |
| `height` | `double` | No | `50` | Altura total del campo. |
| `width` | `double` | No | `60` | Ancho del interruptor. |
| `backColor` | `Color?` | No | `null` | Color de fondo opcional del campo. |
| `valueBackColor` | `Color?` | No | `null` | Color de fondo opcional del bloque del valor. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_toggle_field_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget toggleFieldExample(
  BuildContext context,
  bool active,
  ValueChanged<bool> onChanged,
) {
  final colors = Theme.of(context).colorScheme;
  return IsselToggleField(
    title: 'Activo',
    value: active,
    onChanged: onChanged,
    backColor: colors.surfaceContainer,
    valueBackColor: colors.surface,
  );
}
```

## Comportamiento y límites

- El estado se controla desde el padre. onChanged es requerido y no admite null.
- backColor corresponde a la superficie externa y valueBackColor al riel. El width es del toggle, no de todo el campo.
- No participa en Form y no añade validación de negocio.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
