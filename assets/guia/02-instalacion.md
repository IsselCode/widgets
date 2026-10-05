# Instalación y compatibilidad

## Preparar el entorno

Necesitas Flutter y una copia del paquete. Si lo obtienes desde el repositorio GitHub oficial, también necesitas Git y acceso a ese repositorio. Antes de comenzar, comprueba tu instalación:

```bash
flutter --version
flutter doctor
git --version
```

Usa un SDK moderno y valida tu combinación de Flutter, Dart y el paquete. El código utiliza APIs como `ColorScheme.surfaceContainer`, `CardThemeData`, `Row.spacing`, `Column.spacing` y `Color.withValues`. Esta documentación no establece un mínimo efectivo que no se haya probado.

## Agregar el paquete a una app

Si empiezas desde cero:

```bash
flutter create mi_app
cd mi_app
```

La skill actual permite usar una copia local del paquete o el repositorio GitHub. Añade una de las siguientes opciones al bloque `dependencies` existente, sin duplicar la clave.

Si tu app y el paquete están en carpetas hermanas, puedes usar una ruta local:

```yaml
dependencies:
  flutter:
    sdk: flutter
  issel_code_widgets:
    path: ../issel_code_widgets
```

La ruta se resuelve desde el `pubspec.yaml` de tu app. Debe apuntar a la raíz real del paquete, que contiene su propio `pubspec.yaml` y `lib/`; una carpeta con sólo documentación no sirve como dependencia. Comprueba sus exports y constructores antes de usar los ejemplos.

Para obtener el paquete desde GitHub:

```yaml
dependencies:
  flutter:
    sdk: flutter
  issel_code_widgets:
    git: https://github.com/IsselCode/issel_code_widgets.git
```

La dependencia Git obtiene el contenido de la rama predeterminada del repositorio. Consulta la sintaxis en la [documentación oficial de dependencias Git de Dart](https://dart.dev/tools/pub/dependencies#git-packages).

Resuelve las dependencias:

```bash
flutter pub get
flutter pub deps
```

Comprueba que `issel_code_widgets` aparece en las dependencias resueltas. Para Git, revisa la URL de `pubspec.lock`; para una dependencia local, revisa la ruta resuelta. Si tu aplicación ya tiene el paquete y quieres obtener los cambios más recientes del repositorio, ejecuta `flutter pub upgrade issel_code_widgets`; consulta la [guía oficial de actualización de dependencias](https://dart.dev/tools/pub/cmd/pub-upgrade). La carpeta `example/` del paquete tiene una configuración interna de desarrollo distinta; no copies su dependencia sin comprobar que se ajusta a tu app.

## Elegir el import

| Import | Uso |
| --- | --- |
| `package:issel_code_widgets/issel_code_widgets.dart` | Widgets, tema, app, navegación y escritorio desde presentación/composición. |
| `package:issel_code_widgets/issel_app.dart` | Configuración, controladores de app/presentación y tema. |
| `package:issel_code_widgets/issel_navigation.dart` | Sólo servicio de navegación. |
| `package:issel_code_widgets/issel_desktop.dart` | Piezas y configuración de escritorio. |
| `package:issel_code_widgets/issel_core.dart` | Excepciones, fallos y resultados de datos/dominio. |

Los tipos core se exportan únicamente desde `issel_core.dart`. La biblioteca core utiliza Dart sin imports Flutter; la dependencia que la contiene sigue siendo un paquete Flutter. No importes `lib/src/...` desde una app consumidora.

Para construir UI necesitas también Flutter; el barrel Issel no reexporta `material.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';
```

## Preparar la skill

Puedes [descargar `issel-code-widgets.rar`](https://firebasestorage.googleapis.com/v0/b/issel-academy-d2bff.firebasestorage.app/o/docs_downloads%2Fissel-code-widgets.rar?alt=media&token=4725ebad-13fe-4d5d-99e1-22aa1111ea50) y extraer la carpeta completa de la skill en la ruta indicada a continuación.

Obtén la carpeta completa de la skill de su distribuidor y conserva esta estructura:

```text
issel-code-widgets/
  SKILL.md
  agents/openai.yaml
  references/
    arquitectura.md
    componentes.md
    configuracion-issel.md
    escritorio.md
    patron-visual.md
```

En Codex, la documentación oficial consultada permite skills locales por proyecto en `.agents/skills/` y personales en `~/.agents/skills/`. Coloca allí la carpeta completa. Invócala con `$issel-code-widgets` o selecciónala mediante `/skills`; si no aparece tras un cambio, reinicia Codex. Otros hosts pueden usar su propio mecanismo de descubrimiento. [Guía oficial de skills](https://learn.chatgpt.com/docs/build-skills).

Dos copias de la skill con el mismo nombre pueden tener instrucciones diferentes: comprueba el origen de la seleccionada.

## Primera verificación

Ejecuta la [primera app](../../../../../Desktop/issel_code_widgets/docs/ejemplos/01-primera-app.md) y confirma lo siguiente:

1. El código importa el barrel público y renderiza controles Issel.
2. El modo cambia entre sistema, claro y oscuro.
3. La raíz utiliza la clave de navegación del mismo controlador de app.
4. Los recursos externos que tu pantalla use están configurados.

El paquete utiliza `auto_size_text`, `file_picker` y `shimmer`. Sus widgets de imágenes locales requieren assets declarados por la app; las fuentes y los plugins nativos de ventana también pertenecen a la app. Consulta las [recetas de integración](../../../../../Desktop/issel_code_widgets/docs/ejemplos/04-recetas.md).

Revisa los [créditos y licencias](../referencia/creditos.md) para conocer la autoría, el uso y las licencias de esas dependencias.
