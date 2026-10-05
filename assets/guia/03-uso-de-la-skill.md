# Usar la skill Issel Code Widgets

## Describir el resultado

Con la skill disponible en tu entorno, escribe una petición que describa la pantalla, sus acciones y sus datos:

```text
$issel-code-widgets
Crea un formulario de clientes con nombre, correo y estado activo.
El nombre y el correo son obligatorios. Al guardar, muestra confirmación
y vuelve al listado. Usa el repositorio de clientes que ya existe en el proyecto.
```

No necesitas repetir MVVM, la jerarquía de superficies ni la lista de widgets. Esas convenciones están en la skill. El contexto útil es el contrato real: campos, validación, archivos de integración, comportamiento después de guardar y plataformas objetivo.

## Cuándo se aplica

La skill se activa si la invocas, si pides `issel_code_widgets` o si solicitas explícitamente el estilo Issel. Su descripción excluye proyectos Flutter sin relación con Issel. Una vez activa, sus instrucciones se aplican a la tarea, respetando tus requisitos y las convenciones adoptadas en la app.

## Descargar la skill

[Descarga `issel-code-widgets.rar`](https://firebasestorage.googleapis.com/v0/b/issel-academy-d2bff.firebasestorage.app/o/docs_downloads%2Fissel-code-widgets.rar?alt=media&token=4725ebad-13fe-4d5d-99e1-22aa1111ea50) y extrae la carpeta `issel-code-widgets` en `.agents/skills/` del proyecto o en tu carpeta personal de skills. Después invócala con `$issel-code-widgets`.

## Qué hace el agente

| Paso | Acción | Resultado esperado |
| --- | --- | --- |
| 1 | Lee `pubspec.yaml`, exports, tema y pantallas vecinas. | Componentes y firmas que realmente existen. |
| 2 | Lee la referencia arquitectónica y distingue app establecida de esqueleto Flutter. | Ubicación apropiada de arranque, composición y feature. |
| 3 | Lee los contratos de API/repositorio indicados. | Entidades y adaptación de datos basadas en el producto. |
| 4 | Consulta patrón visual, catálogo y referencia de escritorio cuando corresponde. | Layout y controles elegidos por función. |
| 5 | Implementa estado, validación, acciones, selección y adaptación. | Pantalla funcional con carga, vacío y error. |
| 6 | Formatea, analiza, verifica comportamiento y revisa visualmente si puede ejecutarla. | Cambios comprobables y límites explícitos. |

Si falta la dependencia, la skill pide agregarla desde una copia local disponible o desde GitHub y resolverla antes de escribir UI. La copia local debe ser el paquete real, con `pubspec.yaml` y `lib/`. Si el paquete instalado no exporta los componentes necesarios, se debe explicar la incompatibilidad y detener la implementación dependiente. Una apariencia parecida o usar sólo `IsselColors` no demuestra integración: la vista utiliza componentes reales del barrel público.

## Responsabilidades por tipo de proyecto

| Situación | Comportamiento de la skill |
| --- | --- |
| App nueva o primer módulo del esqueleto `flutter create` | Estructura por features; configuración en `AppIsselController`; navegación Issel con Navigator. |
| App con estructura y estado adoptados | Conserva arquitectura, router y gestor de estado. |
| Modificación visual puntual | Ajusta composición y componentes dentro del alcance solicitado. |
| Feature con reglas compartidas o coordinación compleja | Evoluciona esa feature a `full` cuando se justifica. |
| UI sin backend especificado | Repositorio de demostración identificado como tal. |
| Integración real sin contrato suficiente | Expone los datos concretos pendientes y avanza en lo independiente. |

## Referencias de la skill

| Archivo | Para qué sirve |
| --- | --- |
| `SKILL.md` | Activación, pasos obligatorios, construcción y verificación. |
| `references/arquitectura.md` | Features, MVVM, datos/dominio, acciones y ciclo de vida. |
| `references/configuracion-issel.md` | Fachada mutable, tema, propiedad de instancias y feedback. |
| `references/patron-visual.md` | Superficies, jerarquía, espaciado y adaptación. |
| `references/componentes.md` | Elección funcional de controles y restricciones. |
| `references/escritorio.md` | Shell, menú, navegación y adaptadores de plataforma. |
| `agents/openai.yaml` | Nombre visible y prompt predeterminado del selector. |

`agents/openai.yaml` contiene metadatos de interfaz de la skill. El patrón de escritorio está descrito en la referencia y puede utilizarse sin disponer del proyecto PPG Trazabilidad citado allí.

## Peticiones de ejemplo

### Login con una API existente

```text
$issel-code-widgets
Crea un login con correo, contraseña, mostrar contraseña y recuperar acceso.
Reutiliza lib/core/api/auth_api.dart. La sesión devuelve
{"token":"...","user":{"id":1,"name":"Ana","email":"ana@ejemplo.com"}}.
Al iniciar sesión abre el panel; los errores deben mostrarse con el servicio
de toasts existente. Revisa los métodos reales antes de conectar el formulario.
```

### Firebase Authentication

```text
$issel-code-widgets
Crea acceso con correo y contraseña usando Firebase Authentication.
Reutiliza la inicialización Firebase del proyecto. Incluye recuperar contraseña,
validación y mensaje de credenciales incorrectas. Mantén los tipos Firebase
en la capa de datos y devuelve la entidad de sesión de la aplicación.
```

La skill aporta el patrón de integración. Las credenciales, configuración Firebase y APIs resueltas del producto deben existir para conectar autenticación real.

### CRUD de productos

```text
$issel-code-widgets
Crea el módulo de productos con listado, búsqueda y formulario de creación.
Usa lib/core/api/products_api.dart. Un producto devuelve
{"id":12,"name":"Pintura","price":149.50,"stock":20,"active":true}.
Para crear envía name, price, stock y active; id lo asigna el servidor.
Después de guardar actualiza el listado y muestra una confirmación.
```

### Selector con búsqueda

```text
$issel-code-widgets
Agrega un selector de proveedores con búsqueda por nombre y overlay.
Usa el repositorio existente; aplica debounce y descarta respuestas antiguas.
Conserva la etiqueta seleccionada cuando cambien los resultados.
Muestra carga, ausencia de resultados y opción de reintentar.
```

### Ajustes de apariencia

```text
$issel-code-widgets
Crea una pantalla para elegir sistema, claro u oscuro y ajustar escala de texto
entre 0.5 y 2.0 en pasos de 0.1. Guarda la preferencia usando el almacenamiento
existente. Si el modo es sistema, aplica la edición de escala a ambas variantes
y conserva sus colores y su brillo.
```

### Panel de escritorio

```text
$issel-code-widgets
Crea un panel de inventario para escritorio con menú de Productos y Movimientos,
breadcrumbs y acciones de tema. En móvil usa Drawer y contenido en una columna.
El detalle de un producto debe permitir volver sin alterar la selección del menú.
Reutiliza el router actual y el adaptador de ventana ya instalado.
```

### Pantalla de datos vacíos

```text
$issel-code-widgets
Mejora la vista de clientes: muestra carga al consultar, estado vacío con acción
Crear cliente y error persistente con Reintentar. Reutiliza el controlador actual
y evita ejecutar consultas desde build.
```

### Formulario con imagen

```text
$issel-code-widgets
Crea la edición de perfil con nombre e imagen. Permite seleccionar, previsualizar
y quitar la imagen. El guardado debe deshabilitarse mientras está en curso.
Usa el contrato de actualización existente y comprueba sus límites de tamaño.
```

### Adaptar una pantalla existente

```text
$issel-code-widgets
Adapta lib/features/orders/presentation/order_form.dart al estilo Issel.
Conserva Riverpod, el router, los validadores y el contrato de guardado del proyecto.
Mejora la jerarquía de superficies y el comportamiento en anchos pequeños.
```

### Componente compartido

```text
$issel-code-widgets
Crea un componente CustomerSummary con nombre, correo, estado y acción de abrir.
Debe recibir datos y callbacks; no debe consultar el backend.
Se usará en Clientes y Ventas, así que colócalo en la carpeta compartida existente.
```

### Primera pantalla estática

```text
$issel-code-widgets
Este proyecto sólo tiene la pantalla inicial de flutter create.
Crea un splash con marca, estado de carga y transición al inicio cuando termine
la inicialización que ya existe. Establece la estructura por features y deja
main.dart encargado del arranque.
```

### Galería para documentación

```text
$issel-code-widgets
Crea una galería de documentación con ejemplos de botón, texto validado,
dropdown validado, filtros, carga y tabla. Cada ejemplo debe permitir interactuar,
ver el código y alternar claro/oscuro. Incluye variantes estrecha y amplia,
y explica las restricciones reales de los componentes.
```

La galería es apropiada aquí porque la petición la solicita expresamente. En una pantalla de negocio, se eligen sólo los controles que resuelven su tarea.

## Comprobar un resultado generado

Abre el diff y ejecuta el flujo principal. Comprueba que la vista importa el paquete, los campos validan, la selección se reconstruye, el envío evita duplicados y el resultado produce un único efecto de navegación o feedback. Revisa disposición móvil/escritorio, ambos temas, recursos liberados y dependencias de dominio.
