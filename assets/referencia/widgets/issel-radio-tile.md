# IsselRadioTile

Opción textual de grupo con fondo de selección.

**Categoría:** Selección. **Uso:** Alternativas breves donde no se necesita imagen.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_radio_tile.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselRadioTile(
      {super.key,
      required this.value,
      required this.label,
      required this.alignment,
      this.groupValue,
      this.onChanged,
      this.height = 125,
      this.surfaceColor})
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `value` | `T` | Sí | `—` | Valor representado por esta opción. |
| `label` | `String` | Sí | `—` | Texto mostrado en la opción. |
| `alignment` | `AlignmentGeometry` | Sí | `—` | Alineación del texto dentro de la opción. |
| `groupValue` | `T?` | No | `null` | Valor seleccionado del grupo. |
| `onChanged` | `ValueChanged<T>?` | No | `null` | Callback invocado al seleccionar la opción. |
| `height` | `double` | No | `125` | Altura de la opción. |
| `surfaceColor` | `Color?` | No | `null` | Color de fondo cuando la opción no está seleccionada. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_radio_tile_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget radioTileExample(String? selected, ValueChanged<String> onChanged) =>
    IsselRadioTile<String>(
      value: 'pro',
      groupValue: selected,
      label: 'Plan Pro',
      alignment: Alignment.centerLeft,
      height: 56,
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- alignment es requerido. Su altura predeterminada es 125, no 50; ajústala a la densidad de la pantalla.
- El dueño reconstruye groupValue. value == groupValue define la selección.
- onChanged: null no deshabilita el FilledButton, ya que onPressed continúa siendo una closure.
- La etiqueta tiene maxLines: 1 sin política de ellipsis configurada; usa textos breves.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
