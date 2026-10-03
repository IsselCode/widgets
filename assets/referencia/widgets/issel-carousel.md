# IsselCarousel

Carrusel horizontal con índices virtuales y escala para la selección.

**Categoría:** Datos. **Uso:** Elegir contenido mediante desplazamiento cuando esa interacción es pertinente.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_carousel.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselCarousel({
    super.key,
    required this.height,
    required this.itemBuilder,
    required this.itemCount,
    this.viewportFraction = 0.25,
    this.selectedScale = 1.0,
    this.unselectedScale = 2 / 3,
    this.initialIndex = 0,
    this.onChanged,
    this.onTap,
    this.borderRadius,
    this.stepAnimationDuration = const Duration(milliseconds: 220),
    this.scaleAnimationDuration = const Duration(milliseconds: 250),
    this.curve = Curves.easeOut,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `height` | `double` | Sí | `—` | Altura total del carrusel. |
| `itemBuilder` | `Widget Function(BuildContext context, int index, bool isSelected)` | Sí | `—` | Constructor visual de cada elemento.  Recibe el contexto, el índice real y si el elemento está seleccionado. |
| `itemCount` | `int` | Sí | `—` | Cantidad de elementos reales del carrusel. |
| `viewportFraction` | `double` | No | `0.25` | Fracción del viewport ocupada por cada página. |
| `selectedScale` | `double` | No | `1.0` | Escala aplicada al elemento seleccionado. |
| `unselectedScale` | `double` | No | `2 / 3` | Escala aplicada a los elementos no seleccionados. |
| `initialIndex` | `int` | No | `0` | Índice inicial seleccionado. |
| `onChanged` | `void Function(int index)?` | No | `null` | Callback invocado cuando cambia el índice seleccionado. |
| `onTap` | `void Function(int index)?` | No | `null` | Callback invocado al tocar un elemento. |
| `borderRadius` | `BorderRadius?` | No | `null` | Radio aplicado al material y al efecto táctil de cada elemento. |
| `stepAnimationDuration` | `Duration` | No | `const Duration(milliseconds: 220)` | Duración de la animación entre elementos. |
| `scaleAnimationDuration` | `Duration` | No | `const Duration(milliseconds: 250)` | Duración de la animación de escala. |
| `curve` | `Curve` | No | `Curves.easeOut` | Curva usada por la animación entre elementos. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_carousel_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget carouselExample(ValueChanged<int> onOpen) => IsselCarousel(
      height: 150,
      itemCount: 3,
      viewportFraction: 0.4,
      onTap: onOpen,
      itemBuilder: (context, index, selected) {
        final colors = Theme.of(context).colorScheme;
        return Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: selected ? colors.primary : colors.surface,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
              child: Text('Opción ${index + 1}',
                  style: TextStyle(
                      color: selected ? colors.onPrimary : colors.onSurface))),
        );
      },
    );
```

## Comportamiento y límites

- itemCount > 0 es obligatorio. Para cero elementos muestra un estado vacío antes de construirlo.
- itemBuilder recibe contexto, índice real y selección. onChanged entrega índice real al cambiar página; onTap entrega índice tocado y no lo selecciona automáticamente.
- La implementación usa 1,000,000 páginas virtuales y recentrado cerca de los extremos. Con un elemento muestra una pieza centrada.
- viewportFraction requiere ancho finito. initialIndex se aplica en initState; no hay actualización completa del PageController para cambios posteriores de configuración.
- Si cambia la colección, viewportFraction o el índice inicial y necesitas reinicio, recrea la instancia con una clave apropiada y comprueba el resultado.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
