# IsselThemeSelector

Selector responsive de sistema, claro y oscuro con miniaturas de las paletas.

**Categoría:** Tema. **Uso:** Elegir el modo de apariencia del producto.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_theme_selector.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselThemeSelector({
    super.key,
    required this.controller,
    this.onChanged,
    this.labels = const <ThemeMode, String>{},
    this.descriptions = const <ThemeMode, String>{},
    this.wideBreakpoint = 760,
    this.cardSpacing = 12,
    this.previewHeight = 126,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `controller` | `IsselThemeController` | Sí | `—` | Controlador que proporciona el modo actual y las paletas de preview. |
| `onChanged` | `ValueChanged<ThemeMode>?` | No | `null` | Se invoca después de actualizar el modo del controlador. |
| `labels` | `Map<ThemeMode, String>` | No | `const <ThemeMode, String>{}` | Textos opcionales para reemplazar las etiquetas predeterminadas. |
| `descriptions` | `Map<ThemeMode, String>` | No | `const <ThemeMode, String>{}` | Textos opcionales para reemplazar las descripciones predeterminadas. |
| `wideBreakpoint` | `double` | No | `760` | Ancho mínimo para presentar las opciones en una fila. |
| `cardSpacing` | `double` | No | `12` | Espacio entre tarjetas. |
| `previewHeight` | `double` | No | `126` | Alto de la miniatura de cada tema. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_theme_selector_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget themeSelectorExample(IsselAppController app) => IsselThemeSelector(
      controller: app.theme,
      labels: const {ThemeMode.system: 'Automático'},
    );
```

## Comportamiento y límites

- Recibe la misma instancia de tema que utiliza MaterialApp. La instancia sigue perteneciendo a la composición de la app.
- Actualiza controller.themeMode antes de llamar onChanged. Pulsar el modo ya seleccionado no emite el callback.
- En menos de wideBreakpoint apila tarjetas; en ancho amplio iguala sus alturas con IntrinsicHeight/Row stretch.
- labels y descriptions permiten reemplazos por ThemeMode. El orden sigue sistema, claro, oscuro.
- onChanged permite iniciar persistencia de la app, pero su tipo es ValueChanged y el selector no espera ni maneja una operación asíncrona de almacenamiento.
- No selecciona una paleta editable independiente ni modifica automáticamente ambos temas en modo sistema.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
