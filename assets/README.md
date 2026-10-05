# Documentación de Issel Code Widgets

Esta documentación explica el paquete Flutter `issel_code_widgets` y la skill `issel-code-widgets`, desde la primera instalación hasta la composición de formularios, navegación y aplicaciones de escritorio. Incluye ejemplos que se pueden copiar y una referencia de los componentes públicos.

## Ruta para empezar

1. [Qué son el paquete y la skill](guia/01-introduccion.md).
2. [Instalación y compatibilidad](guia/02-instalacion.md).
3. [Primera aplicación completa](../../../../Desktop/issel_code_widgets/docs/ejemplos/01-primera-app.md).
4. [Usar la skill con lenguaje natural](guia/03-uso-de-la-skill.md).
5. [Elegir un componente](../../../../Desktop/issel_code_widgets/docs/referencia/README.md).

## Guías

| Página | Qué aprenderás |
| --- | --- |
| [Introducción](guia/01-introduccion.md) | Qué aporta cada herramienta y cuándo utilizarla. |
| [Instalación](guia/02-instalacion.md) | Dependencia local o GitHub, imports y preparación de la skill. |
| [Skill](guia/03-uso-de-la-skill.md) | Flujo de trabajo, instrucciones y ejemplos de peticiones. |
| [Arquitectura](guia/04-arquitectura.md) | Features, MVVM, dominio, datos y evolución a `full`. |
| [Tema y configuración](guia/05-tema-y-configuracion.md) | Paletas, tipografía, superficies y cambios durante la ejecución. |
| [Navegación](guia/06-navegacion.md) | Rutas, resultados tipados, reemplazos y retroceso. |
| [Escritorio](guia/07-escritorio.md) | Shell, caption, menú, breadcrumbs y adaptación móvil. |
| [Formularios y estados](guia/08-formularios-y-estados.md) | Validación, selección, carga, errores y ciclo de vida. |

## Ejemplos y componentes compuestos

| Página | Contenido |
| --- | --- |
| [Primera app](../../../../Desktop/issel_code_widgets/docs/ejemplos/01-primera-app.md) | Arranque, configuración mutable y pantalla con tema. |
| [Formulario de clientes](../../../../Desktop/issel_code_widgets/docs/ejemplos/02-formulario-clientes.md) | Feature completa con entidad, repositorio de demostración, controlador y vista. |
| [Componentes reutilizables](../../../../Desktop/issel_code_widgets/docs/ejemplos/03-componentes-reutilizables.md) | Superficies, página responsive, estados, búsqueda, tabla y acciones de guardado. |
| [Recetas de integración](../../../../Desktop/issel_code_widgets/docs/ejemplos/04-recetas.md) | Imágenes, assets, fuentes, búsqueda remota y diálogos. |
| [Referencia por componente](../../../../Desktop/issel_code_widgets/docs/referencia/README.md) | Constructor, propiedades, comportamiento, ejemplo y límites de cada widget. |

## Referencias transversales

| Página | Contenido |
| --- | --- |
| [API de app, tema, navegación y core](../../../../Desktop/issel_code_widgets/docs/referencia/api-transversal.md) | Tipos y métodos públicos que no son widgets. |
| [Preguntas frecuentes y soluciones](guia/09-preguntas-frecuentes.md) | Problemas de instalación, layout, sincronización y navegación. |

## Descargar la skill

Descarga la skill `issel-code-widgets` para usarla con Codex:

[Descargar `issel-code-widgets.rar`](/assets/issel-code-widgets.rar)

Extrae la carpeta `issel-code-widgets` en `.agents/skills/` del proyecto o en tu carpeta personal de skills. Después invócala con `$issel-code-widgets`.

Los ejemplos señalados con `dart-file` son archivos completos. Los fragmentos explicativos restantes indican su contexto. El repositorio de clientes de los ejemplos almacena datos en memoria; una integración real requiere el contrato del producto.

Consulta las imágenes de [escritorio claro](images/desktop-light-v4.png), [móvil oscuro](images/mobile-dark.png) y [galería de componentes](images/widgets.png). Úsalas como material ilustrativo; los constructores y el código del paquete definen el comportamiento.
