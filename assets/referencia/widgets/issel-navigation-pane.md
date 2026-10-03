# IsselNavigationPane

Menú lateral con selección controlada, destinos desplazables y slots.

**Categoría:** Escritorio. **Uso:** Destinos principales del shell y acciones globales reales.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/desktop/issel_navigation_pane.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselNavigationPane({
    super.key,
    required this.items,
    required this.selectedId,
    required this.onSelected,
    this.header,
    this.footer,
    this.width = 190,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `items` | `List<IsselNavigationItem>` | Sí | `—` |  |
| `selectedId` | `String?` | Sí | `—` |  |
| `onSelected` | `ValueChanged<String>` | Sí | `—` |  |
| `header` | `Widget?` | No | `null` |  |
| `footer` | `Widget?` | No | `null` |  |
| `width` | `double` | No | `190` |  |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_navigation_pane_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget navigationPaneExample(
        String? selectedId, ValueChanged<String> onSelected) =>
    IsselNavigationPane(
      selectedId: selectedId,
      items: const [
        IsselNavigationItem(
            id: 'home', label: 'Inicio', icon: Icons.home_outlined),
        IsselNavigationItem(
            id: 'products',
            label: 'Productos',
            icon: Icons.inventory_2_outlined),
      ],
      onSelected: onSelected,
    );
```

## Comportamiento y límites

- items utiliza IsselNavigationItem con id, label, icon y enabled. selectedId puede ser null.
- La app recibe un id desde onSelected y decide destino. El pane no guarda selección independiente ni rutas.
- Incluye Expanded/ListView y requiere alto finito. width debe corresponder a config.sidebarWidth en escritorio.
- La selección utiliza primary/onPrimary; las opciones restantes son transparentes sobre surface. enabled: false deshabilita la acción.
- header/footer admiten widgets del producto. La app controla permisos y visibilidad, no sólo disponibilidad visual.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
