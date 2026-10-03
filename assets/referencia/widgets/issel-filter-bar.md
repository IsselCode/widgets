# IsselFilterBar

Opciones de filtro desplazables horizontalmente, basadas en pills.

**Categoría:** Selección. **Uso:** Filtros breves por estado o categoría.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_filter_bar.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselFilterBar({
    super.key,
    required this.value,
    required this.options,
    required this.onChanged,
    this.height = 48,
    this.itemHeight = 44,
    this.padding = EdgeInsets.zero,
    this.spacing = 8,
    this.selectedColor,
    this.selectedTextColor,
    this.unselectedColor,
    this.unselectedTextColor,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `value` | `T` | Sí | `—` | Valor de la opción seleccionada. |
| `options` | `List<IsselFilterOption<T>>` | Sí | `—` | Opciones disponibles en la barra. |
| `onChanged` | `ValueChanged<T>` | Sí | `—` | Callback invocado con el valor de la opción seleccionada. |
| `height` | `double` | No | `48` | Altura total de la barra. |
| `itemHeight` | `double` | No | `44` | Altura de cada opción. |
| `padding` | `EdgeInsetsGeometry` | No | `EdgeInsets.zero` | Espaciado exterior de la lista horizontal. |
| `spacing` | `double` | No | `8` | Espacio entre opciones. |
| `selectedColor` | `Color?` | No | `null` | Color de la opción seleccionada. |
| `selectedTextColor` | `Color?` | No | `null` | Color del texto de la opción seleccionada. |
| `unselectedColor` | `Color?` | No | `null` | Color de las opciones no seleccionadas. |
| `unselectedTextColor` | `Color?` | No | `null` | Color del texto de las opciones no seleccionadas. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_filter_bar_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget filterBarExample(String value, ValueChanged<String> onChanged) =>
    IsselFilterBar<String>(
      value: value,
      options: const [
        IsselFilterOption(value: 'all', label: 'Todos'),
        IsselFilterOption(value: 'active', label: 'Activos'),
        IsselFilterOption(value: 'archived', label: 'Archivados'),
      ],
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- Las opciones usan IsselFilterOption<T>(value: ..., label: ...). El dueño conserva el valor y aplica el filtro a los datos.
- La selección predeterminada utiliza primary/onPrimary; las opciones restantes surface/onSurface.
- height es de la barra e itemHeight de cada opción. Comprueba que padding y tamaño permitan presentar el contenido.
- No consulta repositorios ni incluye un modo deshabilitado global.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
