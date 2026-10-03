# IsselBreadcrumbs

Ruta visual acotada con etiquetas, navegación y copia opcionales.

**Categoría:** Escritorio. **Uso:** Explicar la ubicación actual en una caption.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/desktop/issel_breadcrumbs.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselBreadcrumbs({super.key, required this.items})
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `items` | `List<IsselBreadcrumbItem>` | Sí | `—` |  |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_breadcrumbs_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget breadcrumbsExample(VoidCallback onHome, VoidCallback onCopy) =>
    IsselBreadcrumbs(items: [
      IsselBreadcrumbItem(label: 'Inventario', onTap: onHome),
      IsselBreadcrumbItem(label: 'Producto 42', onCopy: onCopy),
    ]);
```

## Comportamiento y límites

- Cada IsselBreadcrumbItem recibe label y callbacks opcionales onTap/onCopy; la app define destinos y operación de Clipboard.
- Las etiquetas hacen ellipsis y se separan por >. Necesita ancho disponible finito.
- onCopy usa un botón independiente con copyTooltip. No copia automáticamente label.
- No observa Navigator/Router; la app reconstruye items desde su ruta o contenido activos.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
