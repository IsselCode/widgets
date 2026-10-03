# IsselSearchDropdown

Selector con búsqueda, opciones externas y lista expandible u overlay.

**Categoría:** Formularios. **Uso:** Opciones que justifican búsqueda local o consulta al repositorio.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_search_dropdown.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
const IsselSearchDropdown({
    super.key,
    required this.items,
    required this.hintText,
    required this.onChanged,
    this.height = 50,
    this.value,
    this.color,
    this.onSearchChanged,
    this.onSearchSubmitted,
    this.maxItemsToShow,
    this.overlay = false,
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
| `height` | `double` | No | `50` | Altura del encabezado del dropdown. |
| `value` | `T?` | No | `null` | Valor seleccionado actualmente. |
| `color` | `Color?` | No | `null` | Color de fondo opcional. |
| `onSearchChanged` | `ValueChanged<String>?` | No | `null` | Callback invocado mientras cambia el texto de búsqueda. |
| `onSearchSubmitted` | `ValueChanged<String>?` | No | `null` | Callback invocado al enviar el texto de búsqueda. |
| `maxItemsToShow` | `int?` | No | `null` | Límite opcional de ítems visibles en la lista desplegada. |
| `overlay` | `bool` | No | `false` | Muestra la lista sobre el contenido sin cambiar la altura del layout.  El valor predeterminado es `false`, que conserva el comportamiento expandible del widget. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_search_dropdown_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget searchDropdownExample(
  String? value,
  List<String> filteredNames,
  ValueChanged<String> onSearch,
  ValueChanged<String?> onChanged,
) =>
    IsselSearchDropdown<String>(
      value: value,
      hintText: 'Buscar cliente',
      overlay: true,
      items: [
        for (final name in filteredNames)
          DropdownMenuItem(value: name, child: Text(name)),
      ],
      onSearchChanged: onSearch,
      onChanged: onChanged,
    );
```

## Comportamiento y límites

- La app filtra o consulta datos desde onSearchChanged/onSearchSubmitted. El widget no realiza búsquedas automáticamente.
- maxItemsToShow limita el itemCount construido, no sólo la altura visible. Las opciones posteriores quedan fuera del menú.
- La altura de la lista se calcula con filas de referencia de 45 px y se limita entre 80 y 250 px.
- overlay: true inserta un OverlayEntry debajo del campo, conserva el alto del layout y permite cerrar pulsando fuera. No calcula todas las colisiones con el viewport.
- La etiqueta de una opción elegida internamente puede conservarse aunque desaparezca de items. Un value externo que nunca estuvo en items no dispone de etiqueta cacheada.
- No es FormField<T> y no expone validator para la selección. Su TextFormField interno de búsqueda no sustituye esa validación.
- onChanged: null no impide abrir o elegir visualmente. Las propiedades enabled de DropdownMenuItem no se comprueban al construir los InkWell de opciones.
- La consulta externa puede conservarse al cerrar aunque el campo de búsqueda se recree vacío al abrir. Define la política de reinicio en la app.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
