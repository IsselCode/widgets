# Formularios, selección y estados

## Construir un formulario

Una vista crea una `GlobalKey<FormState>` estable y coloca sus campos dentro de `Form`. Al enviar ejecuta `validate()`, construye un borrador del producto y llama al controlador. Mantén etiquetas visibles cuando el campo necesite conservar contexto después de escribir; el hint por sí solo desaparece.

| Control | Participa en `Form` | Estado |
| --- | --- | --- |
| `IsselTextFormField` | Sí, `FormField<String>`. | Controller externo o interno estable. |
| `IsselDropdown2<T>` | Sí, `FormField<T>`. | Estado interno sincronizado con cambios externos de `value`. |
| `IsselImagePicker` | Sí, `FormField<Uint8List?>`. | Bytes internos y sincronización de bytes externos. |
| `IsselFloatTextField` | El campo visible contiene `IsselTextFormField`. | Controller externo y editor flotante. |
| `IsselDropdown<T>` | No. | Valor controlado por la app. |
| `IsselSearchDropdown<T>` | No valida la selección como `FormField<T>`. | Valor seleccionado de la app y opciones externas. |
| Toggle, radios, filtro, stepper y tabs | No. | Callbacks y estado de presentación. |

Los constructores de los campos Issel no exponen todas las opciones de `TextFormField`/`FormField`. Por ejemplo, `IsselTextFormField` no ofrece `enabled`, `onSaved` ni `initialValue` externos; usa el controller para precargar y `readOnly` o un bloqueo de interacción durante el guardado. Consulta la ficha antes de copiar parámetros de Flutter estándar.

## Validación de texto

`validator` devuelve `null` cuando el valor es válido o un mensaje cuando falla. El texto de error ocupa espacio adicional debajo de la altura del control; no encierres todo el campo en un `SizedBox` de esa misma altura si debe mostrar errores.

```dart
// Campo dentro de Form; nameController pertenece al State:
IsselTextFormField(
  controller: nameController,
  hintText: 'Nombre',
  validator: (value) => (value ?? '').trim().isEmpty
      ? 'Escribe el nombre'
      : null,
)
```

`obscureText: true` incluye el control para mostrar/ocultar contraseña. Conserva `maxLines: 1` en una contraseña. Para texto multilínea configura `minLines`, `maxLines`, acción de teclado y una altura suficiente.

El listener del texto usa `FormFieldState.setValue`, no `didChange`. La validación explícita con `FormState.validate()` funciona; no presupongas que `AutovalidateMode.onUserInteraction` y `Form.onChanged` reciban cada edición como en un `TextFormField` estándar. Además, `onChanged` puede dispararse por cambios programáticos del controller. Valida este comportamiento si tu formulario depende de esas señales.

## Dropdowns y selección externa

En un dropdown simple actualiza el valor y reconstruye el padre. Sus ítems deben tener valores únicos y contener el valor seleccionado. Los dropdowns simples no configuran `isExpanded`; utiliza etiquetas cortas o una composición distinta para valores extensos.

`IsselDropdown2` inicializa el `FormField` con `value` y después presenta `state.value`. Cuando cambia el `value` externo, sincroniza la selección; pasar `null` vuelve a mostrar el hint. Su callback interno sigue activo cuando el callback externo es `null`, así que `onChanged: null` no lo deshabilita. Para impedir cambios durante el guardado, utiliza un [bloqueo del formulario](#bloquear-el-formulario).

El [formulario de clientes](../../../../../Desktop/issel_code_widgets/docs/ejemplos/02-formulario-clientes.md) demuestra validación, reconstrucción, borrador y bloqueo de envío. No depende de `onSaved`, porque los campos del paquete no lo ofrecen como parámetro de sus constructores.

## Bloquear el formulario

`await` espera el resultado de una operación asíncrona mientras la interfaz sigue respondiendo. Para impedir que cambies datos o envíes el formulario otra vez durante esa espera, añade un bloqueo de interacción.

| Necesidad | Opción | Alcance |
| --- | --- | --- |
| Evitar editar texto | `readOnly` en los campos que lo exponen. | Conserva el valor y permite seleccionarlo; no bloquea otros controles. |
| Bloquear un campo o un grupo | `AbsorbPointer` junto con `ExcludeFocus`. | Absorbe toques y clics y excluye el foco de teclado. Usa el estado de carga o guardado que ya tienes en el controlador. |
| Bloquear la pantalla durante un `await` | `LoaderOverlay` junto con un `FocusScopeNode` del formulario. | Muestra progreso y bloquea la interacción sin añadir un `busy` en la vista. |

`AbsorbPointer` por sí solo no bloquea el teclado. Combínalo con `ExcludeFocus` cuando el grupo incluya campos o botones que puedan conservar o recibir foco. Esta composición también sirve para `IsselDropdown2`, cuyo constructor no expone `enabled`.

### Usar una capa de carga

[loader_overlay](https://pub.dev/packages/loader_overlay) es una dependencia opcional de tu aplicación. Añádela con `flutter pub add loader_overlay` e importa `package:loader_overlay/loader_overlay.dart` en la composición y en la vista.

En el [ejemplo de clientes](/ejemplos/formulario-clientes#composicion-y-arranque), la composición coloca `LoaderOverlay` por encima de `CustomersView`. Usa un `context` descendiente de esa capa para llamar a `context.loaderOverlay.show()` y `context.loaderOverlay.hide()`.

La vista crea un `FocusScopeNode` estable, lo conecta con `FocusScope(node: _formFocus, child: ...)` alrededor del formulario y lo libera en `dispose`. Este método de la vista concentra la espera y la limpieza:

```dart
Future<T> _withFormOverlay<T>(Future<T> Function() operation) async {
  _formFocus.unfocus();
  _formFocus.canRequestFocus = false;
  context.loaderOverlay.show();
  try {
    return await operation();
  } finally {
    if (mounted) {
      _formFocus.canRequestFocus = true;
      context.loaderOverlay.hide();
    }
  }
}
```

Dentro del callback de guardado, comprueba el estado del controlador, valida los campos y construye el borrador antes de llamar al método:

```dart
final result = await _withFormOverlay(
  () => _controller.createCustomer(draft),
);
if (!mounted) return;
```

La vista consume `result` para mostrar la confirmación o el fallo. `finally` retira la capa ante éxito, fallo esperado o excepción; comprobar `mounted` evita usar el contexto y el nodo de foco después de desmontar la pantalla. Conserva la protección de concurrencia del controlador con `isLoading` e `isSaving`: el bloqueo visual no sustituye esa responsabilidad ni cancela una petición pendiente.

Al establecer `canRequestFocus = false` en un `FocusScopeNode`, sus descendientes tampoco pueden recibir foco. Consulta la [API de foco de Flutter](https://api.flutter.dev/flutter/widgets/FocusNode/canRequestFocus.html). Define el alcance de la capa al integrar diálogos o navegación, y comprueba el retroceso con tu router en las plataformas de destino.

## Búsqueda y filtros

`IsselSearchDropdown` presenta búsqueda y opciones; la app implementa el filtrado o consulta. Empieza siempre desde la colección completa al filtrar, de modo que borrar la consulta recupere resultados. `maxItemsToShow` **limita el número de opciones construidas**; no sólo el alto de la lista. Omítelo si necesitas que todas las coincidencias sean accesibles mediante scroll.

`overlay: true` mantiene el alto del layout, pero el overlay se abre debajo del campo y no implementa reposicionamiento para todos los límites de viewport. Comprueba campos al final de pantalla y teclado abierto. Un callback `onChanged: null` tampoco bloquea la apertura del buscador; utiliza un bloqueo de interacción cuando necesites modo deshabilitado.

`IsselFilterBar`, radios y `IsselTabSwitcher` requieren que el dueño reconstruya con el nuevo valor. La barra de filtros utiliza `primary/onPrimary` para la selección. `IsselTabSwitcher` alterna el valor al tocar cualquier parte, incluso el lado ya seleccionado: úsalo para una alternancia de dos estados, o compón un control distinto si necesitas seleccionar directamente una pestaña.

## Cantidades

`IsselStepperField` admite límites y `step` decimales. Su callback entrega `double`; para una cantidad entera conviértela en presentación según tu contrato. Los botones aplican el paso y limitan el valor; la entrada manual no obliga a que el número sea múltiplo de `step`.

La entrada válida dentro del rango se comunica al enviar o perder foco; al exceder límites, puede corregirse y notificarse durante la edición. Usa punto decimal. Cambiar `initValue` actualiza el control cuando no tiene foco; cambiar sólo los límites no fuerza una normalización inmediata de su estado anterior.

## Estados de pantalla

| Estado | Interfaz | Acción |
| --- | --- | --- |
| Carga inicial | Shimmer con forma del contenido o progreso con mensaje. | Esperar; impedir acciones dependientes. |
| Contenido | Datos y controles disponibles. | Interacción habitual. |
| Vacío | Explicación breve y acción relevante. | Crear, cambiar filtro o volver. |
| Error persistente | Mensaje seguro y reintento cuando corresponda. | Volver a consultar. |
| Guardado | Acción deshabilitada y mensaje de progreso. | Evitar duplicados. |
| Error de formulario | Mensaje junto al campo o feedback puntual. | Corregir datos. |

El resultado de un guardado (`AppResult<T>`) no sustituye a estos estados. Un error de carga puede persistir en la vista; una confirmación tras guardar es un efecto puntual. No ejecutes operaciones de red en `build`.

`IsselShimmer` comienza tras un retraso de 50 ms y antes devuelve tamaño cero. Si quieres reservar espacio desde el inicio, envuélvelo en un contenedor con dimensiones estables. Sus animaciones y las del indicador no llegan a un reposo permanente; en tests utiliza `pump` con una duración apropiada en lugar de esperar indefinidamente con `pumpAndSettle`.

El indicador Issel actual pinta un tamaño de `24 × 24` con `primary` aunque el constructor reciba otros valores. Si necesitas tamaño/color distintos, usa un componente que sí aplique ese contrato. Este límite está registrado en su [ficha](../../../../../Desktop/issel_code_widgets/docs/referencia/widgets/issel-circular-progress-indicator.md).

## Accesibilidad y adaptación

Revisa texto ampliado, foco, teclado, estados anunciados y objetivos táctiles. `IsselButton` y `IsselCaptionButton` utilizan botones Material; otros controles personalizados necesitan una revisión específica de semántica según su uso. Para progreso incluye una etiqueta de estado, y no comuniques selección únicamente por color.

Una tabla requiere alto acotado y puede necesitar ancho mínimo con scroll horizontal construido por la app. En móvil un listado de tarjetas puede explicar mejor los datos. Las pills sirven para estados cortos; coloca instrucciones largas en `Text` o en un bloque informativo.

El paquete no ofrece una promesa global de accesibilidad ni adaptación automática de todos los controles. La [referencia](../../../../../Desktop/issel_code_widgets/docs/referencia/README.md) registra sus límites y los [componentes reutilizables](../../../../../Desktop/issel_code_widgets/docs/ejemplos/03-componentes-reutilizables.md) muestran composiciones que la app puede ajustar.
