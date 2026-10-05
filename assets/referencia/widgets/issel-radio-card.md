# IsselRadioCard

Opción de grupo representada por una tarjeta cuadrada con asset.

**Categoría:** Selección. **Uso:** Opciones cuyo contenido visual ayuda a distinguir alternativas.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_radio_card.dart).

El ajuste de la etiqueta utiliza [auto_size_text](https://pub.dev/packages/auto_size_text), de Simon Leier y colaboradores, con [licencia MIT](https://pub.dev/packages/auto_size_text/license). Consulta los [créditos y licencias](../creditos.md).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselRadioCard(
      {super.key,
      required this.value,
      required this.label,
      required this.asset,
      this.groupValue,
      this.onChanged,
      this.size = 125,
      this.surfaceColor})
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `value` | `T` | Sí | `—` | Valor representado por esta opción. |
| `label` | `String` | Sí | `—` | Texto mostrado en la tarjeta. |
| `asset` | `String` | Sí | `—` | Ruta del asset mostrado como imagen. |
| `groupValue` | `T?` | No | `null` | Valor seleccionado del grupo. |
| `onChanged` | `ValueChanged<T>?` | No | `null` | Callback invocado al seleccionar la tarjeta. |
| `size` | `double` | No | `125` | Tamaño cuadrado de la tarjeta. |
| `surfaceColor` | `Color?` | No | `null` | Color de fondo cuando la tarjeta no está seleccionada. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_radio_card_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget radioCardExample(
  String asset,
  String? selected,
  ValueChanged<String> onChanged,
) =>
    IsselRadioCard<String>(
      value: 'delivery',
      groupValue: selected,
      label: 'Entrega',
      asset: asset,
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- Se selecciona cuando value == groupValue; el dueño actualiza groupValue.
- size fija ancho/alto; la imagen usa 40% y AutoSizeText limita la etiqueta a una línea.
- asset requiere declaración. La selección usa primary/onPrimary y el estado inactivo surfaceColor/surface.
- Aunque onChanged admite null, onPressed sigue siendo una closure. El botón no queda deshabilitado en Material; usa un bloqueo explícito si hace falta.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
