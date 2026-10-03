# IsselTextFormField

Campo de texto integrado con FormField<String> y un TextField interno.

**Categoría:** Formularios. **Uso:** Texto, correo, contraseña y entrada multilínea con validación explícita.

Importa el barrel público y Flutter Material. [Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/src/issel_text_form_field.dart).

## Constructor

Esta firma corresponde al código fuente, incluyendo nulabilidad y defaults; las condiciones y el comportamiento se explican debajo.

```dart
IsselTextFormField({
    super.key,
    this.controller,
    this.onSubmitted,
    this.onChanged,
    this.onTap,
    this.textAlign,
    this.style,
    this.inputFormatters,
    this.keyboardType,
    this.readOnly = false,
    this.autofocus = false,
    this.focusNode,
    required this.hintText,
    this.prefixIcon,
    this.obscureText = false,
    this.fillColor,
    this.height = 60,
    this.minLines,
    this.maxLines = 1,
    this.textInputAction,
    this.textAlignVertical,
    FormFieldValidator<String>? validator,
    AutovalidateMode? autovalidateMode,
  })
```

## Propiedades

“Requerido” significa que debes pasar el argumento, incluso cuando su tipo admite `null`. Los valores `null` de color suelen delegar al tema; consulta las notas para el rol efectivo.

| Parámetro | Tipo | Requerido | Default | Descripción |
| --- | --- | --- | --- | --- |
| `key` | `Key?` | No | `null` | Identidad del widget en el árbol Flutter. |
| `controller` | `TextEditingController?` | No | `null` | Controlador externo opcional del texto. |
| `onSubmitted` | `void Function(String value)?` | No | `null` | Callback invocado al enviar el texto. |
| `onChanged` | `void Function(String value)?` | No | `null` | Callback invocado cuando cambia el texto. |
| `onTap` | `VoidCallback?` | No | `null` | Callback invocado al tocar el campo. |
| `textAlign` | `TextAlign?` | No | `null` | Alineación horizontal del texto. |
| `style` | `TextStyle?` | No | `null` | Estilo opcional del texto escrito. |
| `inputFormatters` | `List<TextInputFormatter>?` | No | `null` | Formateadores aplicados al texto ingresado. |
| `keyboardType` | `TextInputType?` | No | `null` | Tipo de teclado que se muestra al editar el campo. |
| `readOnly` | `bool` | No | `false` | Indica si el campo es de solo lectura. |
| `autofocus` | `bool` | No | `false` | Indica si el campo debe solicitar foco automáticamente. |
| `focusNode` | `FocusNode?` | No | `null` | Nodo de foco externo opcional. |
| `hintText` | `String` | Sí | `—` | Texto de ayuda mostrado cuando el campo está vacío. |
| `prefixIcon` | `IconData?` | No | `null` | Icono opcional mostrado al inicio del campo. |
| `obscureText` | `bool` | No | `false` | Indica si el texto debe ocultarse como contraseña. |
| `fillColor` | `Color?` | No | `null` | Color de relleno opcional. |
| `height` | `double` | No | `60` | Altura del campo. |
| `minLines` | `int?` | No | `null` | Número mínimo de líneas visibles. |
| `maxLines` | `int?` | No | `1` | Número máximo de líneas visibles. Usa `null` para permitir líneas ilimitadas. |
| `textInputAction` | `TextInputAction?` | No | `null` | Acción mostrada en el teclado. |
| `textAlignVertical` | `TextAlignVertical?` | No | `null` | Alineación vertical del texto dentro del campo. |
| `validator` | `FormFieldValidator<String>?` | No | `null` | Devuelve null para válido o un mensaje de error. |
| `autovalidateMode` | `AutovalidateMode?` | No | `null` | Política de autovalidación del FormField. |

## Ejemplo

Este archivo define una función que devuelve el widget. Llámala desde `build` con tus datos/callbacks, y conserva el estado y los recursos en su dueño. No ejecuta callbacks ficticios.

<!-- dart-file: lib/doc_samples/issel_text_form_field_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

Widget textFormFieldExample(TextEditingController controller) =>
    IsselTextFormField(
      controller: controller,
      hintText: 'Correo',
      prefixIcon: Icons.email_outlined,
      keyboardType: TextInputType.emailAddress,
      validator: (value) =>
          (value ?? '').contains('@') ? null : 'Escribe un correo válido',
    );
```

## Comportamiento y límites

- controller y focusNode externos los libera su dueño; el widget crea y libera los recursos internos cuando no se suministran.
- El error aparece debajo del control y aumenta la altura total. height define sólo la superficie de entrada.
- obscureText añade un botón de mostrar/ocultar contraseña. Mantén maxLines: 1 para ese caso.
- Para varias líneas configura minLines, maxLines y height; maxLines: null permite más líneas dentro de la altura disponible.
- Los cambios del controller llaman setValue y pueden invocar onChanged programáticamente. No garantiza las mismas señales de Form.onChanged/onUserInteraction que TextFormField.
- No expone enabled, onSaved ni initialValue como parámetros. readOnly impide editar, y AbsorbPointer puede bloquear interacción durante guardar.
- Si sustituyes un FocusNode externo durante la vida del campo, el código actual no actualiza su nodo interno en didUpdateWidget. Conserva su identidad o recrea el campo.

Para ejemplos con estado y composición completos, consulta [componentes reutilizables](../../ejemplos/03-componentes-reutilizables.md) y [formularios](../../guia/08-formularios-y-estados.md).
