# IsselDropdown

Dropdown simple que presenta el value controlado por la app.

**Categoría:** Formularios. **Uso:** Listas cortas que no requieren validación de Form.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_dropdown.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselDropdown({
    super.key,
    required this.items,
    required this.hintText,
    required this.onChanged,
    this.height = 50,
    this.value,
    this.color,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `items` | `List<DropdownMenuItem<T>>?` | Sí | `—` | Opciones disponibles en el dropdown. |
| `hintText` | `String` | Sí | `—` | Texto mostrado cuando no hay valor seleccionado. |
| `onChanged` | `void Function(T?)?` | Sí | `—` | Callback invocado cuando cambia el valor seleccionado. |
| `height` | `double` | No | `50` | Altura del contenedor del dropdown. |
| `value` | `T?` | No | `null` | Valor seleccionado actualmente. |
| `color` | `Color?` | No | `null` | Color de fondo opcional.  Si es null, usa [ColorScheme.surface]. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_dropdown_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget dropdownExample(String? value, ValueChanged<String?> onChanged) =>
    IsselDropdown<String>(
      value: value,
      hintText: 'Estado',
      items: const [
        DropdownMenuItem(value: 'active', child: Text('Activo')),
        DropdownMenuItem(value: 'paused', child: Text('Pausado')),
      ],
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- items y onChanged son argumentos requeridos pero sus tipos permiten null. onChanged: null deshabilita el DropdownButton interno.
- Reconstruye el padre con el valor entregado. Las opciones deben contener un valor seleccionado único.
- No incorpora validator, onSaved ni búsqueda. Para Form utiliza IsselDropdown2.
- El DropdownButton no usa isExpanded: limita la longitud de sus etiquetas y comprueba anchos reducidos.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
