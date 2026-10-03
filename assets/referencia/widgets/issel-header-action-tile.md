# IsselHeaderActionTile

Encabezado de título y subtítulo con un botón lateral.

**Categoría:** Acciones. **Uso:** Una sección breve con acción relacionada.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_header_action_tile.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselHeaderActionTile({
    super.key,
    this.height = 50,
    required this.textButton,
    required this.title,
    required this.subTitle,
    required this.onPressed,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `height` | `double` | No | `50` | Altura total del encabezado. |
| `textButton` | `String` | Sí | `—` | Texto mostrado en el botón. |
| `title` | `String` | Sí | `—` | Título principal del encabezado. |
| `subTitle` | `String` | Sí | `—` | Subtítulo descriptivo del encabezado. |
| `onPressed` | `VoidCallback` | Sí | `—` | Callback invocado al presionar el botón. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_header_action_tile_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget headerActionExample(VoidCallback onCreate) => IsselHeaderActionTile(
      title: 'Clientes',
      subTitle: 'Administra los registros del equipo',
      textButton: 'Crear',
      height: 72,
      onPressed: onCreate,
    );
```

## Comportamiento y límites

- Título y subtítulo están acotados a una línea con ellipsis. El subtítulo utiliza subTitle.
- El Row distribuye texto y botón con Expanded en partes iguales. No incorpora un cambio automático a columna.
- Para textos extensos, accesibilidad o móvil estrecho, compón un encabezado responsive en la app.
- El fondo está fijado a surface; el constructor no ofrece color. Considera la capa que lo contiene.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
