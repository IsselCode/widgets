# IsselRowTable

Fila de celdas IsselPill distribuidas con ancho equivalente.

**Categoría:** Datos. **Uso:** Datos breves en IsselTableWidget.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_table/issel_row_table.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselRowTable({
    super.key,
    required this.cells,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `cells` | `List<IsselPill>` | Sí | `—` | Celdas mostradas en la fila. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_row_table_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget rowTableExample(BuildContext context) => IsselRowTable(cells: [
      IsselPill(
          text: 'Ana', color: Theme.of(context).colorScheme.surfaceContainer),
      IsselPill(
          text: 'Activo',
          color: Theme.of(context).colorScheme.surfaceContainer),
    ]);
```

## Comportamiento y límites

- cells es List<IsselPill>, no List<Widget>. Para contenido personalizado utiliza IsselPill(widget: ...).
- Una fila con menos celdas que el encabezado es aceptada, pero se redistribuye según su propia cantidad; usa cantidades iguales para alinear columnas.
- El espacio entre celdas es 20 px. No hay pesos por columna, selección de fila ni edición incorporadas.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
