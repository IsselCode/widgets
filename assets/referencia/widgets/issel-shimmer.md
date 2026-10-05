# IsselShimmer

Placeholder rectangular que muestra animación tras un retraso.

**Categoría:** Estados. **Uso:** Carga temporal en el lugar donde aparecerá contenido.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_shimmer.dart).

La animación utiliza [shimmer](https://pub.dev/packages/shimmer), de HungHD (`hnvn`) y colaboradores, con [licencia BSD-3-Clause](https://pub.dev/packages/shimmer/license). Consulta los [créditos y licencias](../creditos.md).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselShimmer(
      {super.key,
      required this.width,
      required this.height,
      this.delay = const Duration(milliseconds: 50)})
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `width` | `double` | Sí | `—` | Ancho del placeholder. |
| `height` | `double` | Sí | `—` | Altura del placeholder. |
| `delay` | `Duration` | No | `const Duration(milliseconds: 50)` | Tiempo de espera antes de mostrar el shimmer. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_shimmer_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget shimmerExample() => const SizedBox(
      height: 50,
      child: IsselShimmer(width: double.infinity, height: 50),
    );
```

## Comportamiento y límites

- El retraso predeterminado es 50 ms. Hasta entonces devuelve SizedBox.shrink y no reserva espacio.
- Envuelve el widget en un SizedBox si necesitas dimensiones estables desde el comienzo.
- Lee colores del tema y utiliza radio 10. El temporizador comprueba mounted antes de reconstruir.
- No representa un estado vacío permanente. En tests evita pumpAndSettle mientras la animación siga activa.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
