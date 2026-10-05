# IsselImagePicker

Selector de imagen con bytes, Form, carga y limpieza.

**Categoría:** Imágenes. **Uso:** Seleccionar y previsualizar una imagen de perfil, producto o documento.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_image_picker.dart).

El selector predeterminado utiliza [file_picker](https://pub.dev/packages/file_picker), de Miguel Ruivo y colaboradores, con [licencia MIT](https://pub.dev/packages/file_picker/license). Consulta los [créditos y licencias](../creditos.md).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
IsselImagePicker({
    super.key,
    this.bytes,
    this.imageProvider,
    this.loading = false,
    this.onTap,
    this.onChanged,
    this.pickImage,
    this.onError,
    this.height = 210,
    this.width = double.infinity,
    this.borderRadius = 18,
    this.backgroundColor,
    this.placeholderText = 'Seleccionar imagen',
    this.placeholderIcon = Icons.add_a_photo_outlined,
    this.placeholder,
    this.loadingWidget,
    this.showClearButton = true,
    this.clearIcon = Icons.close_outlined,
    this.clearIconBackgroundColor,
    this.clearIconColor,
    this.fit = BoxFit.cover,
    FormFieldValidator<Uint8List?>? validator,
    AutovalidateMode? autovalidateMode,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `bytes` | `Uint8List?` | No | `null` | Bytes de la imagen inicial o actualmente seleccionada. |
| `imageProvider` | `ImageProvider<Object>?` | No | `null` | Imagen inicial obtenida desde una fuente externa, como una URL. |
| `loading` | `bool` | No | `false` | Indica si la aplicación está ocupada con una operación externa. |
| `onTap` | `VoidCallback?` | No | `null` | Callback invocado cuando el usuario toca el selector. |
| `onChanged` | `ValueChanged<Uint8List?>?` | No | `null` | Callback invocado después de seleccionar una imagen correctamente. |
| `pickImage` | `Future<Uint8List?> Function()?` | No | `null` | Selector opcional para reemplazar el uso predeterminado de [FilePicker]. |
| `onError` | `ValueChanged<Object>?` | No | `null` | Callback invocado si falla la selección de la imagen. |
| `height` | `double` | No | `210` | Altura del selector. |
| `width` | `double` | No | `double.infinity` | Ancho del selector. |
| `borderRadius` | `double` | No | `18` | Radio de las esquinas. |
| `backgroundColor` | `Color?` | No | `null` | Color de fondo del selector. Por defecto usa [ColorScheme.surface]. |
| `placeholderText` | `String` | No | `'Seleccionar imagen'` | Texto mostrado cuando no hay una imagen seleccionada. |
| `placeholderIcon` | `IconData` | No | `Icons.add_a_photo_outlined` | Icono mostrado cuando no hay una imagen seleccionada. |
| `placeholder` | `Widget?` | No | `null` | Contenido personalizado para el estado vacío. |
| `loadingWidget` | `Widget?` | No | `null` | Indicador personalizado para el estado de carga. |
| `showClearButton` | `bool` | No | `true` | Indica si se muestra el botón para limpiar la imagen seleccionada. |
| `clearIcon` | `IconData` | No | `Icons.close_outlined` | Icono mostrado en el botón para limpiar la imagen. |
| `clearIconBackgroundColor` | `Color?` | No | `null` | Color de fondo del botón para limpiar la imagen. |
| `clearIconColor` | `Color?` | No | `null` | Color del icono para limpiar la imagen. |
| `fit` | `BoxFit` | No | `BoxFit.cover` | Ajuste usado para mostrar la imagen seleccionada. |
| `validator` | `FormFieldValidator<Uint8List?>?` | No | `null` | Devuelve null para válido o un mensaje de error. |
| `autovalidateMode` | `AutovalidateMode?` | No | `null` | Política de autovalidación del FormField. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_image_picker_example.dart -->
```dart
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget imagePickerExample(
  Uint8List? bytes,
  ValueChanged<Uint8List?> onChanged,
  ValueChanged<Object> onError,
) =>
    IsselImagePicker(
      bytes: bytes,
      onChanged: onChanged,
      onError: onError,
      fit: BoxFit.contain,
      height: 210,
      validator: (value) => value == null ? 'Selecciona una imagen' : null,
    );
```

## Comportamiento y límites

- Sin pickImage utiliza FilePicker.pickFile(type: FileType.image) y readAsBytes. onTap notifica la interacción y no sustituye ese selector.
- pickImage puede devolver null para cancelar; se conserva la imagen anterior y no se llama onChanged por cancelación.
- bytes tiene prioridad sobre imageProvider. El provider muestra una imagen existente, pero no convierte su contenido a bytes para el validator.
- loading externo o una selección interna en curso bloquean nuevas pulsaciones y limpieza. El widget comprueba mounted tras await.
- Limpiar entrega null y oculta el provider; actualizar bytes/provider desde fuera sincroniza el estado según didUpdateWidget.
- No comprime, recorta, sube ni valida automáticamente el tamaño del archivo. onError cubre errores del proceso de selección, no todos los errores de decodificación/render de Image.
- Form.reset restaura initialValue de bytes; _showImageProvider no tiene un reset específico. Si necesitas restaurar también el provider, define esa política desde la app.
- Los mensajes de validación ocupan altura adicional. Una imagen existente por provider requiere una regla específica si el validator exige bytes no nulos.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
