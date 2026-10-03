# IsselDesktopScaffold

Shell que combina sidebar, caption y contenido con adaptación al ancho.

**Categoría:** Escritorio. **Uso:** Composición global de una herramienta de escritorio.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/desktop/issel_desktop_scaffold.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselDesktopScaffold({
    super.key,
    required this.caption,
    required this.child,
    this.sidebar,
    this.sidebarOpen = false,
    this.onSidebarClose,
    this.edgeToEdge = false,
    this.config = const IsselDesktopConfig(),
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `caption` | `Widget` | Sí | `—` |  |
| `child` | `Widget` | Sí | `—` |  |
| `sidebar` | `Widget?` | No | `null` |  |
| `sidebarOpen` | `bool` | No | `false` |  |
| `onSidebarClose` | `VoidCallback?` | No | `null` |  |
| `edgeToEdge` | `bool` | No | `false` |  |
| `config` | `IsselDesktopConfig` | No | `const IsselDesktopConfig()` |  |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_desktop_scaffold_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget desktopScaffoldExample(
  Widget content,
  Widget sidebar,
  bool open,
  VoidCallback onClose,
) =>
    IsselDesktopScaffold(
      caption: const IsselDesktopCaption(title: Text('Inventario')),
      sidebar: sidebar,
      sidebarOpen: open,
      onSidebarClose: onClose,
      child: content,
    );
```

## Comportamiento y límites

- El padre necesita ancho y alto finitos. El modo normal reserva config.captionHeight una vez.
- En ancho amplio el sidebar abierto reduce el ancho del contenido. En ancho estrecho se superpone con ModalBarrier.
- sidebarOpen es controlado por la app. onSidebarClose debe actualizar ese estado; no se cierra por sí solo.
- edgeToEdge superpone caption y omite sidebar/barrera. Protege controles interactivos debajo de la barra.
- Configura la misma altura en caption y config. El menú y las rutas del producto siguen siendo responsabilidad de la app.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
