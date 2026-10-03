# IsselStepperField

Entrada numérica con botones, límites e incremento entero o decimal.

**Categoría:** Selección. **Uso:** Cantidades acotadas o escalas con incrementos discretos.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_stepper_field.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselStepperField({
    super.key,
    required this.title,
    required this.minValue,
    required this.maxValue,
    required this.onChanged,
    this.initValue = 0,
    this.step = 1,
    this.height = 50,
    this.backColor,
    this.counterColor,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `title` | `String` | Sí | `—` | Texto descriptivo mostrado junto al contador. |
| `minValue` | `num` | Sí | `—` | Valor mínimo permitido. |
| `maxValue` | `num` | Sí | `—` | Valor máximo permitido. |
| `onChanged` | `ValueChanged<double>` | Sí | `—` | Callback invocado cuando cambia el valor. |
| `initValue` | `double` | No | `0` | Valor inicial del campo. |
| `step` | `num` | No | `1` | Incremento o decremento aplicado por los botones. |
| `height` | `double` | No | `50` | Altura total del campo. |
| `backColor` | `Color?` | No | `null` | Color de fondo opcional del campo. |
| `counterColor` | `Color?` | No | `null` | Color de fondo opcional del contador. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_stepper_field_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget stepperExample(double scale, ValueChanged<double> onChanged) =>
    IsselStepperField(
      title: 'Escala',
      minValue: 0.5,
      maxValue: 2,
      step: 0.1,
      initValue: scale,
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- minValue/maxValue/step aceptan num; initValue y el callback utilizan double. minValue <= maxValue y step > 0 se comprueban con assert.
- Los botones aplican step y clamp. El valor se normaliza a diez decimales para reducir residuos de coma flotante.
- El paso no impone una rejilla a la entrada manual: un valor dentro del rango puede tener otra precisión.
- La entrada manual válida se confirma al enviar o perder foco; una entrada fuera de rango puede limitarse durante onChanged. Utiliza punto decimal.
- didUpdateWidget actualiza initValue si cambia y el campo no tiene foco. Cambiar sólo los límites no normaliza de inmediato el valor anterior.
- No es FormField y no expone una opción enabled. Si necesita bloqueo, úsalo en el contenedor de presentación.
- El campo divide etiqueta y contador por mitades; para móvil muy estrecho comprueba que los botones y el número tengan espacio.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
