# IsselCircularProgressIndicator

Indicador indeterminado animado con borde degradado.

**Categoría:** Estados. **Uso:** Espera breve acompañada de un mensaje o etiqueta accesible.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_circular_progress_indicator.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
IsselCircularProgressIndicator(
      {super.key, this.color, this.height = 24, this.width = 24})
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `color` | `Color?` | No | `null` | Color opcional del indicador. |
| `height` | `double` | No | `24` | Altura deseada del indicador. |
| `width` | `double` | No | `24` | Ancho deseado del indicador. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_circular_progress_indicator_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget progressExample() => Semantics(
      label: 'Cargando',
      liveRegion: true,
      child: Center(child: IsselCircularProgressIndicator()),
    );
```

## Comportamiento y límites

- El constructor expone height, width y color, pero build utiliza actualmente 24 × 24 y colorScheme.primary siempre.
- La animación se repite cada dos segundos y libera su AnimationController en dispose.
- No ofrece value ni porcentaje de progreso. El pintor dibuja un borde redondeado; no presupongas un medidor circular determinado.
- Para tamaño/color configurables, usa un indicador que aplique esos parámetros o una composición alternativa de la app.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
