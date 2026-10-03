# Navegación con IsselNavigationService

## Conectar el servicio

`IsselNavigationService` encapsula la pila imperativa de `Navigator` mediante una clave estable. `IsselAppController.navigation` ya proporciona una instancia; conéctala a `MaterialApp.navigatorKey`, como en la [primera app](../../../../../Desktop/issel_code_widgets/docs/ejemplos/01-primera-app.md), y reutilízala desde presentación.

También puedes construir un servicio directamente si tu composición lo requiere:

```dart
final navigation = IsselNavigationService();

// En la raíz:
MaterialApp(
  navigatorKey: navigation.navigatorKey,
  home: const HomeView(),
)
```

`isReady` es `true` cuando `navigatorKey.currentState` no es `null`; es decir, cuando el `Navigator` al que conectaste la clave ya está montado en el árbol de widgets. Antes de montar `MaterialApp` o si la clave no está conectada, vale `false`. Esta señal solo confirma que el `Navigator` está disponible: `canGoBack` puede seguir siendo `false` cuando estás en la ruta raíz. Si llamas a una operación de navegación antes del montaje, el servicio lanza `StateError`; no guarda ni descarta la acción para ejecutarla después. El servicio se crea por instancia, no es un singleton global y no registra destinos: tu aplicación decide qué `Widget` o `Route` empujar.

## Operaciones

| API | Comportamiento |
| --- | --- |
| `isReady` | `bool` de solo lectura; es `true` cuando `navigatorKey.currentState` ya está disponible porque el `Navigator` está montado. |
| `navigateTo<T>(Widget page, ...)` | Push de `MaterialPageRoute<T>`; Future del resultado al cerrar. |
| `pushRoute<T>(Route<T> route)` | Push de una ruta creada por la app, con transición propia. |
| `pushReplacement<T, TO>(Widget page, result: ...)` | Sustituye la ruta; `TO` es el resultado de la anterior y `T` el de la nueva. |
| `pushAndRemoveUntil<T>(Widget page, predicate: ...)` | Push y eliminación según predicado; por defecto limpia toda la pila anterior. |
| `popUntilRoute(String name)` | Retrocede hasta nombre de ruta; conserva la raíz si no lo encuentra. |
| `popUntilWidget(Type type)` | Busca el nombre derivado del tipo; no una identidad de objeto Widget. |
| `goBack<T>([T? result])` | Solicita retroceso con `maybePop`; respeta `PopScope`. |
| `canGoBack` | Indica pila disponible debajo; no evalúa bloqueos de `PopScope`. |

Las operaciones que crean `MaterialPageRoute` admiten `settings` y `fullscreenDialog`. Si no envías nombre, el servicio usa `page.runtimeType.toString()`. Para productos con metadatos de ruta, configura nombres explícitos.

## Resultado tipado completo

El archivo siguiente contiene una página de selección y una vista que recibe su resultado. Usa el servicio de la raíz; muestra `TypedNavigationExample(navigation: app.navigation)` como contenido de una ruta montada.

<!-- dart-file: lib/commons/widgets/typed_navigation_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

class TypedNavigationExample extends StatefulWidget {
  const TypedNavigationExample({super.key, required this.navigation});

  final IsselNavigationService navigation;

  @override
  State<TypedNavigationExample> createState() => _TypedNavigationExampleState();
}

class _TypedNavigationExampleState extends State<TypedNavigationExample> {
  String? _selection;

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(_selection ?? 'Sin selección'),
          const SizedBox(height: 12),
          IsselButton(text: 'Elegir categoría', onTap: _select),
        ],
      );

  Future<void> _select() async {
    final result = await widget.navigation.navigateTo<String>(
      CategorySelectionView(navigation: widget.navigation),
      settings: const RouteSettings(name: '/categories/select'),
    );
    if (!mounted || result == null) return;
    setState(() => _selection = result);
  }
}

class CategorySelectionView extends StatelessWidget {
  const CategorySelectionView({super.key, required this.navigation});

  final IsselNavigationService navigation;

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Categoría')),
        body: Padding(
          padding: const EdgeInsets.all(24),
          child: IsselButton(
            text: 'Seleccionar herramientas',
            onTap: () async {
              await navigation.goBack<String>('Herramientas');
            },
          ),
        ),
      );
}
```

El Future del push se completa al cerrar la ruta, no al terminar la transición de entrada. Una salida sin selección devuelve `null`. La vista caller comprueba `mounted` antes de actualizar su estado.

## Reemplazar y limpiar la pila

```dart
// Presentación; nextView es el Widget de destino:
navigation.pushReplacement<String, int>(nextView, result: 42);

// Tras cerrar sesión, loginView es la vista real del producto:
navigation.pushAndRemoveUntil<void>(
  loginView,
  settings: const RouteSettings(name: '/login'),
);

// Conservar una sección nombrada:
navigation.pushAndRemoveUntil<void>(
  detailView,
  predicate: (route) => route.settings.name == '/customers',
);
```

Si reseteas la pila, la nueva ruta pasa a ser raíz y el retroceso devuelve `false`. No esperes un Future de navegación para ejecutar tareas que deban suceder mientras la ruta permanece abierta.

## Retroceso y bloqueos

`goBack` devuelve si la solicitud fue atendida. Un `PopScope(canPop: false)` puede atenderla y conservar la ruta, por lo que **`true` no significa siempre que se haya retirado una pantalla**. Para decidir si el botón Volver debe aparecer, utiliza la pila real; para confirmar salida con datos sin guardar, la política pertenece a la vista y su `PopScope`.

En móvil una raíz con Drawer puede mostrar hamburguesa y una ruta secundaria retroceso. En escritorio abrir/cerrar menú y volver son acciones distintas. No deduzcas retroceso sólo por presencia de Drawer o de un sidebar.

## Router, selección y URLs

El kit no sincroniza automáticamente menú ni breadcrumbs con la pila. Deriva `selectedId` de la ruta activa mediante el router existente o un `NavigatorObserver` de la app. Un estado de selección que cambia sólo al tocar el menú queda desactualizado al hacer pop, reemplazar o recibir navegación externa.

Cuando necesites URLs, deep links o pila declarativa, conserva o elige el router adecuado al producto. `IsselNavigationService` no ofrece enrutamiento web ni parseo de URLs. La [guía oficial de navegación Flutter](https://docs.flutter.dev/ui/navigation) explica la elección entre Navigator y Router.

Navegación y Widgets pertenecen a presentación/composición. El controlador devuelve resultados del negocio; dominio y repositorios no reciben destinos ni `BuildContext`.
