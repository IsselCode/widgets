# IsselHeaderTable

Encabezado de tabla construido con pills y columnas de igual ancho.

**Categoría:** Datos. **Uso:** Títulos de las columnas de IsselTableWidget.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_table/issel_header_table.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselHeaderTable({
    super.key,
    required this.titleHeaders,
    this.colorPills,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `titleHeaders` | `List<String>` | Sí | `—` | Títulos mostrados como columnas del encabezado. |
| `colorPills` | `Color?` | No | `null` | Color de fondo opcional de las píldoras del encabezado. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_header_table_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget headerTableExample() => const IsselHeaderTable(
      titleHeaders: ['Nombre', 'Estado'],
    );
```

## Comportamiento y límites

- titleHeaders define la cantidad de columnas. El encabezado usa pills de 50 px y separación de 20 px entre columnas.
- colorPills permite ajustar la capa de fondo; por defecto utiliza surfaceContainer.
- No configura ancho individual, ordenación ni encabezados multilínea. Para tablas complejas compón una solución apropiada.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
