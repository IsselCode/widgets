# IsselTabSwitcher

Alternancia de dos estados con indicador animado.

**Categoría:** Selección. **Uso:** Cambiar entre dos modos cuando tocar alterna el estado.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/tab_switcher.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselTabSwitcher({
    super.key,
    required this.state,
    required this.leftText,
    required this.rightText,
    required this.onChanged,
    this.height = 50,
    this.width = double.infinity,
    this.color,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `state` | `TabSwitcherAlignStates` | Sí | `—` | Estado seleccionado actualmente. |
| `leftText` | `String` | Sí | `—` | Texto de la opción izquierda. |
| `rightText` | `String` | Sí | `—` | Texto de la opción derecha. |
| `onChanged` | `ValueChanged<TabSwitcherAlignStates>` | Sí | `—` | Callback invocado cuando cambia el estado seleccionado. |
| `height` | `double` | No | `50` | Altura total del selector. |
| `width` | `double` | No | `double.infinity` | Ancho total del selector. |
| `color` | `Color?` | No | `null` | Color de fondo opcional.  Si es null, usa [ColorScheme.surface]. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_tab_switcher_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget tabSwitcherExample(
  TabSwitcherAlignStates state,
  ValueChanged<TabSwitcherAlignStates> onChanged,
) =>
    IsselTabSwitcher(
      state: state,
      leftText: 'Mensual',
      rightText: 'Anual',
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- Utiliza TabSwitcherAlignStates.left/right y reconstruye state desde el padre.
- Cualquier pulsación alterna la selección, incluso si se toca el lado activo. No implementa selección independiente de cada etiqueta.
- Requiere ancho finito; en Row usa Expanded o width concreto. La animación del indicador dura 250 ms.
- No controla una TabBarView ni conserva páginas. La app elige el contenido que corresponde al estado.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
