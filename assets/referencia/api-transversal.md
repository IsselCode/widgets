# API de configuración, tema, navegación y core

Esta referencia cubre los tipos públicos que acompañan a los [widgets](README.md). Usa los imports de las bibliotecas públicas del paquete.

## Entrypoints

| Biblioteca | Exports |
| --- | --- |
| `issel_code_widgets.dart` | Los 32 widgets, `GradientBorderPainter`, modelos de selección/escritorio, tema, app y navegación. |
| `issel_app.dart` | `IsselAppConfig`, `IsselAppController`, `IsselController` y tipos de tema. |
| `issel_desktop.dart` | Configuración de escritorio, caption, botón, breadcrumbs, pane, scaffold y sus modelos. |
| `issel_navigation.dart` | `IsselNavigationService`. |
| `issel_core.dart` | `AppException`, `AppFailure`, `AppResult<T>`, `AppSuccess<T>`, `AppError<T>`. |

Los tipos core no se incluyen en el barrel de widgets, para mantener el límite de dominio y evitar conflictos con excepciones del consumidor. `material.dart` tampoco se reexporta. Los nombres de app que aparecen en tutoriales (`AppIsselController`, `CustomerEntity`, etc.) son ejemplos locales.

## IsselAppConfig

Configuración inmutable del kit para una app. Importa desde `issel_app.dart` o el barrel de widgets.

```dart
const IsselAppConfig({
  String title = 'Issel Code',
  IsselThemeConfig lightTheme = const IsselThemeConfig(
    colors: IsselThemeColors.light(),
  ),
  IsselThemeConfig darkTheme = const IsselThemeConfig(
    colors: IsselThemeColors.dark(),
  ),
  ThemeMode themeMode = ThemeMode.system,
  IsselDesktopConfig desktop = const IsselDesktopConfig(),
})
```

Las cinco propiedades se leen con sus nombres. `copyWith({title, lightTheme, darkTheme, themeMode, desktop})` devuelve otra configuración; todos sus argumentos son opcionales y nulos para conservar el valor existente. No contiene endpoints, destinos, sesión, permisos ni persistencia.

## IsselAppController

Extiende `IsselController`; concentra configuración, tema y navegación.

```dart
IsselAppController({
  IsselAppConfig config = const IsselAppConfig(),
  IsselNavigationService? navigation,
})
```

| Miembro | Tipo/contrato |
| --- | --- |
| `config` | Getter `IsselAppConfig`; configuración efectiva. |
| `theme` | `final IsselThemeController`; creado y liberado por el controlador. |
| `navigation` | `final IsselNavigationService`; inyectado o creado una vez. |
| `updateConfig(IsselAppConfig config)` | Aplica variantes, modo y configuración; notifica al controlador de app una vez. |
| `dispose()` | Retira su listener, libera tema y base; es idempotente. |

`updateConfig` conserva identidad de `.theme`, `.navigation` y `navigatorKey`. El controlador también observa cambios directos del tema y los copia a `.config`. La raíz escucha al controlador de app para reconstruir MaterialApp. `updateConfig` tras `dispose` lanza `StateError`.

Si tienes listeners directos de `.theme`, cada actualización clara/oscura puede notificarlos durante `updateConfig`; la notificación única indicada corresponde al controlador de app. La fachada del producto concentra métodos específicos usando `config.copyWith`.

## IsselController

Clase abstracta de presentación basada en `ChangeNotifier`. No pertenece al dominio.

| Miembro | Contrato |
| --- | --- |
| `isDisposed` | Getter booleano; inicialmente false, true después de `dispose`. |
| `notifyIfActive()` | Método protegido para subclases; notifica sólo mientras sigue activa. |
| `dispose()` | Marca la instancia como liberada y libera `ChangeNotifier`; idempotente. |

Hereda listeners de `ChangeNotifier`. `notifyIfActive` evita avisos tardíos, pero no impide por sí mismo mutar campos ni cancela Futures. Comprueba `isDisposed` antes de asignar tras un `await`, libera recursos propios antes de `super.dispose()` y mantén un único dueño.

## IsselColors

Clase `abstract final` de constantes. No se instancia. Los controles leen el tema en vez de depender de estas constantes.

| Constante | Valor |
| --- | --- |
| `darkScaffoldBackground` | `Color(0xff0F101B)` |
| `darkSurface` | `Color(0xff272832)` |
| `lightScaffoldBackground` | `Color(0xffE5ECF4)` |
| `lightSurface` | `Color(0xffF6F8FA)` |
| `grey` | `Color(0xff727385)` |
| `white` | `Color(0xffFFFFFF)` |
| `darkWhite` | `Color(0xd3ffffff)` |
| `black` | `Color(0xff000000)` |
| `error` | `Colors.red` |
| `primary` | `Color(0xff0F52FF)` |
| `darkPrimary` | `Color(0xff0046FF)` |
| `secondary` | `Color(0xff1A3A9F)` |

Úsalas para construir defaults cuando sea necesario. En las vistas prefiere los roles efectivos del tema y los overrides centralizados.

## IsselThemeColors

Paleta semántica inmutable. El constructor general exige todos los roles excepto `outlineVariant`:

```dart
const IsselThemeColors({
  required Brightness brightness,
  required Color scaffoldBackground,
  required Color surface,
  required Color surfaceContainer,
  required Color primary,
  required Color onPrimary,
  required Color primaryContainer,
  required Color onPrimaryContainer,
  required Color secondary,
  required Color onSecondary,
  required Color error,
  required Color onError,
  required Color onSurface,
  required Color outline,
  Color? outlineVariant,
})
```

Los constructores `const IsselThemeColors.light({...})` y `.dark({...})` permiten overrides opcionales de todos los colores y fijan `brightness` respectivamente a claro y oscuro. Los defaults completos están en [tema y configuración](../guia/05-tema-y-configuracion.md).

| Miembro | Comportamiento |
| --- | --- |
| Propiedades con los nombres del constructor | Lectura del rol configurado. |
| `colorScheme` | Getter `ColorScheme` generado con semilla primary y overrides de los roles. |
| `copyWith({...})` | Recibe cada rol opcionalmente, incluido brightness, y conserva los no indicados. |

`scaffoldBackground` se aplica en `ThemeData.scaffoldBackgroundColor`, no como una propiedad extra del ColorScheme. `outlineVariant: null` en un constructor utiliza el generado por semilla; en `copyWith` null conserva el anterior. Para volver al valor generado crea una paleta nueva según tu configuración.

La igualdad de `scaffoldBackground` y `surfaceContainer` es un contrato visual de la skill/defaults. La clase no obliga a esa igualdad mediante assertions.

## IsselTextThemeConfig

Configuración inmutable que construye un `TextTheme`. Constructor `const` y `copyWith` con los siguientes parámetros:

| Propiedad | Tipo | Default |
| --- | --- | --- |
| `fontFamily` | `String?` | null. |
| `fontSizeScale` | `double` | 1.0. |
| `displayLargeHeight`, `displayMediumHeight`, `displaySmallHeight` | `double` cada una | 1.0. |
| `headlineLargeHeight`, `headlineMediumHeight`, `headlineSmallHeight` | `double` cada una | 1.0. |
| `titleLargeHeight`, `titleMediumHeight`, `titleSmallHeight` | `double` cada una | 1.0. |
| `bodyLargeHeight`, `bodyMediumHeight`, `bodySmallHeight` | `double` cada una | 1.0. |
| `labelLargeHeight`, `labelMediumHeight`, `labelSmallHeight` | `double` cada una | 1.0. |

`build({Color? onSurface, required Color outline})` devuelve el TextTheme con tamaños/pesos del kit, escala global y familia. `outline` pinta labels. Consulta [la tabla de tamaños](../guia/05-tema-y-configuracion.md) para las 15 variantes.

`copyWith` recibe los mismos campos con tipos nulos para conservar valores. No permite limpiar `fontFamily` pasando null; crea una configuración nueva para quitarla. El paquete no descarga fuentes y no valida rangos de escala en este tipo. La app limita su editor y revisa accesibilidad/layout.

## IsselThemeConfig

```dart
const IsselThemeConfig({
  required IsselThemeColors colors,
  IsselTextThemeConfig text = const IsselTextThemeConfig(),
  double borderRadius = 10,
  double cardBorderRadius = 16,
})
```

| Miembro | Comportamiento |
| --- | --- |
| `colors`, `text`, `borderRadius`, `cardBorderRadius` | Propiedades inmutables. |
| `toThemeData()` | Crea ThemeData Material 3 a partir de esta configuración. |
| `copyWith({colors, text, borderRadius, cardBorderRadius})` | Copia sólo los overrides. |

El tema configura fondo, esquema, AppBar sin surface tint, FAB circular, Card con superficie/radio, divisores, ListTile y TextTheme. `borderRadius` afecta a ListTileTheme y `cardBorderRadius` a CardThemeData; los widgets que fijan radios propios conservan esos valores.

## IsselThemeController

Controlador basado directamente en `ChangeNotifier`, con constructor:

```dart
IsselThemeController({
  IsselThemeConfig? light,
  IsselThemeConfig? dark,
  IsselThemeColors? lightColors,
  IsselThemeColors? darkColors,
  IsselTextThemeConfig text = const IsselTextThemeConfig(),
  ThemeMode themeMode = ThemeMode.system,
})
```

Si se suministra `light` o `dark`, esa configuración tiene prioridad sobre el color/texto abreviado de su variante. Si falta, construye una configuración con los defaults o los argumentos abreviados.

| API | Retorno/efecto |
| --- | --- |
| `themeMode` | Getter `ThemeMode`. |
| `lightConfig`, `darkConfig` | Getters `IsselThemeConfig`. |
| `lightTheme`, `darkTheme` | Getters `ThemeData` generados desde las configuraciones. |
| `themeFor(Brightness brightness)` | ThemeData de la variante indicada. |
| `updateLight(IsselThemeConfig config)` | Sustituye configuración clara y notifica. |
| `updateDark(IsselThemeConfig config)` | Sustituye configuración oscura y notifica. |
| `updateLightColors(IsselThemeColors colors)` | Cambia sólo la paleta clara. |
| `updateDarkColors(IsselThemeColors colors)` | Cambia sólo la paleta oscura. |
| `updateLightText(IsselTextThemeConfig text)` | Cambia sólo la tipografía clara. |
| `updateDarkText(IsselTextThemeConfig text)` | Cambia sólo la tipografía oscura. |
| `updateText(IsselTextThemeConfig text)` | Aplica esa misma configuración tipográfica a ambas y notifica una vez. |
| `setThemeMode(ThemeMode mode)` | Cambia modo y notifica, salvo si ya era el mismo. |
| `dispose()` | Liberación heredada de ChangeNotifier. |

No ofrece `isDisposed` de `IsselController`. Cuando pertenece a `IsselAppController`, éste es su dueño y lo libera. No dispongas `.theme` por separado desde una vista. El modo sistema no convierte una llamada a `updateLightColors` en edición de ambas paletas; esa política se implementa en la fachada del producto.

## IsselDesktopConfig

```dart
const IsselDesktopConfig({
  double sidebarWidth = 190,
  double captionHeight = 32,
  double sidebarBreakpoint = 900,
  Duration animationDuration = const Duration(milliseconds: 180),
})
```

Propiedades inmutables con esos nombres y `copyWith` de las cuatro. Assertions: `sidebarWidth > 0`, `captionHeight >= 28`, `sidebarBreakpoint > sidebarWidth`. La curva del shell es `easeOutCubic`; no es propiedad configurable en este tipo.

## Modelos auxiliares de selección y escritorio

| Tipo | Constructor y propiedades |
| --- | --- |
| `IsselFilterOption<T>` | `const IsselFilterOption({required T value, required String label})`. Ambos campos final. |
| `TabSwitcherAlignStates` | Enum con `left` y `right`. |
| `IsselNavigationItem` | `const IsselNavigationItem({required String id, required String label, required IconData icon, bool enabled = true})`. Campos final. |
| `IsselBreadcrumbItem` | `const IsselBreadcrumbItem({required String label, VoidCallback? onTap, VoidCallback? onCopy, String copyTooltip = 'Copiar'})`. Campos final. |

Estos tipos no implementan repositorios, destinos ni almacenamiento. Los genéricos comparan selección mediante `==` de sus valores; usa identificadores estables o define igualdad apropiada en tus entidades.

## IsselNavigationService

```dart
IsselNavigationService({GlobalKey<NavigatorState>? navigatorKey})
```

Si no recibe clave, crea una propia. `navigatorKey` es final. Conecta la misma clave a MaterialApp.

| API pública | Retorno y parámetros |
| --- | --- |
| `isReady` | `bool`; Navigator montado. |
| `canGoBack` | `bool`; evalúa canPop, sin política PopScope. |
| `navigateTo<T>(Widget page, {RouteSettings? settings, bool fullscreenDialog = false})` | `Future<T?>`; push MaterialPageRoute. |
| `pushRoute<T>(Route<T> route)` | `Future<T?>`; ruta de la app. |
| `pushReplacement<T, TO>(Widget page, {TO? result, RouteSettings? settings, bool fullscreenDialog = false})` | `Future<T?>`; completa ruta previa con `TO`. |
| `pushAndRemoveUntil<T>(Widget page, {RoutePredicate? predicate, RouteSettings? settings, bool fullscreenDialog = false})` | `Future<T?>`; por defecto elimina rutas previas. |
| `popUntilWidget(Type widgetType)` | `void`; busca nombre derivado del tipo. |
| `popUntilRoute(String name)` | `void`; busca nombre o conserva la raíz. |
| `goBack<T>([T? result])` | `Future<bool>`; false en raíz, si hay pila llama maybePop. |

Las operaciones requieren Navigator montado o lanzan `StateError`. El nombre predeterminado es `runtimeType.toString`; `settings.arguments` se conserva. `goBack: true` puede indicar un retroceso atendido por PopScope que mantuvo la ruta. La [guía de navegación](../guia/06-navegacion.md) incluye el ejemplo tipado y explica cuándo utilizar un router.

## AppException

Tipo Dart que implementa `Exception`. Importa `issel_core.dart`.

```dart
const AppException({
  required String message,
  String? code,
  Object? cause,
  StackTrace? stackTrace,
})
```

Cuatro propiedades final con los mismos nombres. `message` es seguro para UI; causa/traza conservan diagnóstico. `toString()` muestra `AppException: mensaje` o `AppException (código): mensaje`; no incluye automáticamente causa o traza. El mensaje seguro depende del texto que suministre el consumidor.

## AppFailure

Tiene el mismo constructor y propiedades que `AppException`, pero representa un fallo esperado que se devuelve como dato:

```dart
const AppFailure({
  required String message,
  String? code,
  Object? cause,
  StackTrace? stackTrace,
})

factory AppFailure.fromException(AppException exception)
```

La fábrica copia los cuatro campos. `toString()` utiliza el prefijo `AppFailure`, con código opcional. La app define los códigos y recuperación. Ni este tipo ni la excepción implementan igualdad por valor o serialización personalizada.

## AppResult<T>, AppSuccess<T> y AppError<T>

`AppResult<T>` es sealed y tiene constructor base const y dos fábricas:

```dart
const factory AppResult.success(T value) = AppSuccess<T>;
const factory AppResult.error(AppFailure failure) = AppError<T>;
```

| Tipo/miembro | Contrato |
| --- | --- |
| `AppSuccess<T>` | Clase final; `const AppSuccess(T value)` y `final T value`. |
| `AppError<T>` | Clase final; `const AppError(AppFailure failure)` y `final AppFailure failure`. |
| `AppResult.isSuccess` | Getter bool; comprueba la variante de éxito. |
| `fold<R>({required R Function(T value) onSuccess, required R Function(AppFailure failure) onError})` | Retorna R ejecutando exactamente la rama correspondiente. |

Un éxito de tipo nullable puede contener null; eso no es un error. No hay propiedades `data`, `isError` ni métodos `map`/`when` en esta API. Puedes utilizar switch exhaustivo o fold, sin `dartz`.

<!-- dart-file: lib/doc_samples/core_result_example.dart -->
```dart
import 'package:issel_code_widgets/issel_core.dart';

String describeResult(AppResult<int> result) => switch (result) {
      AppSuccess<int>(:final value) => 'Valor recibido: $value',
      AppError<int>(:final failure) => failure.message,
    };

Future<AppResult<String>> guardedLoad(Future<String> Function() fetch) async {
  try {
    return AppResult.success(await fetch());
  } on AppException catch (exception) {
    return AppResult.error(AppFailure.fromException(exception));
  }
}
```

Este código pertenece a datos/dominio y no importa Flutter. La pantalla mantiene por separado sus estados de carga, vacío y error persistente. El [formulario de clientes](../ejemplos/02-formulario-clientes.md) muestra una operación completa que devuelve el resultado y produce feedback desde la vista.
