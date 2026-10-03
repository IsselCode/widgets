# Primera aplicación completa

Esta app muestra un campo validado, una acción principal, el selector de tema y una escala tipográfica. Utiliza una configuración centralizada que se puede cambiar durante la ejecución. No añade gestor de estado, router ni backend externos.

## Preparación

Crea una app Flutter, agrega la dependencia GitHub siguiendo [instalación](../guia/02-instalacion.md) y ejecuta `flutter pub get`. Después reemplaza el arranque inicial y crea los cuatro archivos siguientes. Los bloques incluyen todos sus imports.

```text
lib/
  main.dart
  core/app/issel_demo_app.dart
  src/
    issel/presentation/controllers/app_issel_controller.dart
    home/presentation/views/home_view.dart
```

## Configuración de la app

`AppIsselController` es una clase del producto. El paquete exporta su clase base `IsselAppController`. Los métodos específicos de la fachada conservan los campos que no se editan.

<!-- dart-file: lib/src/issel/presentation/controllers/app_issel_controller.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

class AppIsselController extends IsselAppController {
  AppIsselController()
      : super(
          config: const IsselAppConfig(
            title: 'Mi aplicación Issel',
            lightTheme: IsselThemeConfig(colors: IsselThemeColors.light()),
            darkTheme: IsselThemeConfig(colors: IsselThemeColors.dark()),
            themeMode: ThemeMode.system,
          ),
        );

  void configure({
    String? title,
    IsselThemeConfig? lightTheme,
    IsselThemeConfig? darkTheme,
    ThemeMode? themeMode,
    IsselDesktopConfig? desktop,
  }) {
    updateConfig(config.copyWith(
      title: title,
      lightTheme: lightTheme,
      darkTheme: darkTheme,
      themeMode: themeMode,
      desktop: desktop,
    ));
  }

  void setTitle(String title) => configure(title: title);
  void setThemeMode(ThemeMode mode) => configure(themeMode: mode);
  void setLightTheme(IsselThemeConfig theme) => configure(lightTheme: theme);
  void setDarkTheme(IsselThemeConfig theme) => configure(darkTheme: theme);
  void updateLightColors(IsselThemeColors colors) =>
      setLightTheme(config.lightTheme.copyWith(colors: colors));
  void updateDarkColors(IsselThemeColors colors) =>
      setDarkTheme(config.darkTheme.copyWith(colors: colors));
  void updateLightText(IsselTextThemeConfig text) =>
      setLightTheme(config.lightTheme.copyWith(text: text));
  void updateDarkText(IsselTextThemeConfig text) =>
      setDarkTheme(config.darkTheme.copyWith(text: text));
  void updateDesktop(IsselDesktopConfig desktop) => configure(desktop: desktop);

  void setPrimaryForCurrentMode(Color color) {
    final mode = config.themeMode;
    configure(
      lightTheme: mode != ThemeMode.dark
          ? config.lightTheme.copyWith(
              colors: config.lightTheme.colors.copyWith(primary: color),
            )
          : null,
      darkTheme: mode != ThemeMode.light
          ? config.darkTheme.copyWith(
              colors: config.darkTheme.colors.copyWith(primary: color),
            )
          : null,
    );
  }

  void setTextScaleForCurrentMode(double scale) {
    final mode = config.themeMode;
    configure(
      lightTheme: mode != ThemeMode.dark
          ? config.lightTheme.copyWith(
              text: config.lightTheme.text.copyWith(fontSizeScale: scale),
            )
          : null,
      darkTheme: mode != ThemeMode.light
          ? config.darkTheme.copyWith(
              text: config.darkTheme.text.copyWith(fontSizeScale: scale),
            )
          : null,
    );
  }
}
```

Cambiar sólo `primary` conserva el brillo y los otros roles de cada paleta. Si un nuevo color requiere otro `onPrimary`, modifica también ese rol y verifica contraste. Las preferencias se guardan mediante una integración del producto cuando se necesite persistencia.

## Composición global

La raíz crea y libera una sola instancia. `AnimatedBuilder` reconstruye `MaterialApp` al cambiar configuración o tema. `navigatorKey` pertenece al servicio que la app comparte.

<!-- dart-file: lib/core/app/issel_demo_app.dart -->
```dart
import 'package:flutter/material.dart';

import '../../src/home/presentation/views/home_view.dart';
import '../../src/issel/presentation/controllers/app_issel_controller.dart';

class IsselDemoApp extends StatefulWidget {
  const IsselDemoApp({super.key});

  @override
  State<IsselDemoApp> createState() => _IsselDemoAppState();
}

class _IsselDemoAppState extends State<IsselDemoApp> {
  final _app = AppIsselController();

  @override
  void dispose() {
    _app.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
        animation: _app,
        builder: (_, __) => MaterialApp(
          debugShowCheckedModeBanner: false,
          title: _app.config.title,
          theme: _app.theme.lightTheme,
          darkTheme: _app.theme.darkTheme,
          themeMode: _app.theme.themeMode,
          navigatorKey: _app.navigation.navigatorKey,
          home: HomeView(app: _app),
        ),
      );
}
```

## Vista de inicio

El `AppBar` identifica la pantalla. El formulario tiene una superficie `surface`, con el campo sobre `surfaceContainer`. La vista administra sus recursos de texto; la configuración global sigue perteneciendo a la raíz.

<!-- dart-file: lib/src/home/presentation/views/home_view.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

import '../../../issel/presentation/controllers/app_issel_controller.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key, required this.app});

  final AppIsselController app;

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();

  @override
  void dispose() {
    _name.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final text = Theme.of(context).textTheme;
    final dark = Theme.of(context).brightness == Brightness.dark;
    final scale = dark
        ? widget.app.config.darkTheme.text.fontSizeScale
        : widget.app.config.lightTheme.text.fontSizeScale;

    return Scaffold(
      appBar: AppBar(title: const Text('Inicio')),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 820),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: colors.surface,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Text('Tu nombre', style: text.titleMedium),
                          const SizedBox(height: 12),
                          IsselTextFormField(
                            controller: _name,
                            hintText: 'Escribe tu nombre',
                            fillColor: colors.surfaceContainer,
                            textInputAction: TextInputAction.done,
                            onSubmitted: (_) => _greet(),
                            validator: (value) => (value ?? '').trim().isEmpty
                                ? 'Escribe tu nombre'
                                : null,
                          ),
                          const SizedBox(height: 16),
                          IsselButton(text: 'Saludar', onTap: _greet),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text('Apariencia', style: text.titleMedium),
                  const SizedBox(height: 12),
                  IsselThemeSelector(controller: widget.app.theme),
                  const SizedBox(height: 20),
                  IsselStepperField(
                    title: 'Escala de texto',
                    minValue: 0.5,
                    maxValue: 2,
                    step: 0.1,
                    initValue: scale,
                    onChanged: widget.app.setTextScaleForCurrentMode,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _greet() {
    if (!(_formKey.currentState?.validate() ?? false)) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Hola, ${_name.text.trim()}')),
    );
  }
}
```

## Arranque

<!-- dart-file: lib/main.dart -->
```dart
import 'package:flutter/material.dart';

import 'core/app/issel_demo_app.dart';

void main() => runApp(const IsselDemoApp());
```

## Ejecutar y experimentar

```bash
dart format lib
flutter analyze
flutter run -d chrome
```

`chrome` requiere el target web y navegador disponibles. También puedes seleccionar un dispositivo con `flutter devices` y ejecutar `flutter run -d <id>`.

Prueba nombre vacío y válido, modo oscuro, ventana estrecha y escala aumentada. Cambia el título mediante `app.setTitle(...)` y el color de marca mediante `app.setPrimaryForCurrentMode(...)` desde una acción de presentación. Para un guardado con datos separados por capas, continúa con el [formulario de clientes](02-formulario-clientes.md).

Esta página se utiliza también como base de compilación de los ejemplos siguientes: éstos añaden archivos sobre esta estructura y mantienen el mismo `AppIsselController`.
