# Referencia de componentes

El catálogo reúne **32 widgets públicos** y el pintor exportado. En cada ficha puedes consultar el constructor, sus propiedades, un ejemplo y los límites de uso.

Los tipos auxiliares `IsselFilterOption`, `TabSwitcherAlignStates`, `IsselNavigationItem` e `IsselBreadcrumbItem` y las APIs de app/tema/navegación/core se describen en [API transversal](api-transversal.md).

Los ejemplos breves de las fichas reciben datos/callbacks como parámetros. Para ejecutar una pantalla completa empieza en [primera app](../ejemplos/01-primera-app.md).

## Acciones

| Componente | Función |
| --- | --- |
| [IsselButton](widgets/issel-button.md) | Acción principal basada en FilledButton, con texto, foco y tamaño configurable. |
| [IsselActionBox](widgets/issel-action-box.md) | Tarjeta pulsable con imagen local, título y acción opcional de eliminar. |
| [IsselHeaderActionTile](widgets/issel-header-action-tile.md) | Encabezado de título y subtítulo con un botón lateral. |

## Información

| Componente | Función |
| --- | --- |
| [IsselPill](widgets/issel-pill.md) | Superficie breve para texto o un widget, con acción opcional. |
| [IsselInfoField](widgets/issel-info-field.md) | Etiqueta y valor destacado en dos bloques de ancho equivalente. |
| [IsselInfoField2](widgets/issel-info-field2.md) | Información con icono, etiqueta y acción de copiar opcional. |

## Imágenes

| Componente | Función |
| --- | --- |
| [IsselAssetContainer](widgets/issel-asset-container.md) | Contenedor de asset local o favicon de un dominio, con sombra. |
| [IsselImagePicker](widgets/issel-image-picker.md) | Selector de imagen con bytes, Form, carga y limpieza. |

## Formularios

| Componente | Función |
| --- | --- |
| [IsselTextFormField](widgets/issel-text-form-field.md) | Campo de texto integrado con FormField<String> y un TextField interno. |
| [IsselFloatTextField](widgets/issel-float-text-field.md) | Campo de lectura que abre un editor flotante mediante una ruta transparente. |
| [IsselDropdown](widgets/issel-dropdown.md) | Dropdown simple que presenta el value controlado por la app. |
| [IsselDropdown2](widgets/issel-dropdown2.md) | Dropdown integrado con FormField<T> para validar una selección. |
| [IsselSearchDropdown](widgets/issel-search-dropdown.md) | Selector con búsqueda, opciones externas y lista expandible u overlay. |

## Selección

| Componente | Función |
| --- | --- |
| [IsselStepperField](widgets/issel-stepper-field.md) | Entrada numérica con botones, límites e incremento entero o decimal. |
| [IsselToggle](widgets/issel-toggle.md) | Interruptor visual booleano controlado por la app. |
| [IsselToggleField](widgets/issel-toggle-field.md) | Etiqueta y toggle en una superficie de una línea. |
| [IsselRadioCard](widgets/issel-radio-card.md) | Opción de grupo representada por una tarjeta cuadrada con asset. |
| [IsselRadioTile](widgets/issel-radio-tile.md) | Opción textual de grupo con fondo de selección. |
| [IsselFilterBar](widgets/issel-filter-bar.md) | Opciones de filtro desplazables horizontalmente, basadas en pills. |
| [IsselTabSwitcher](widgets/issel-tab-switcher.md) | Alternancia de dos estados con indicador animado. |

## Estados

| Componente | Función |
| --- | --- |
| [IsselShimmer](widgets/issel-shimmer.md) | Placeholder rectangular que muestra animación tras un retraso. |
| [IsselCircularProgressIndicator](widgets/issel-circular-progress-indicator.md) | Indicador indeterminado animado con borde degradado. |

## Datos

| Componente | Función |
| --- | --- |
| [IsselCarousel](widgets/issel-carousel.md) | Carrusel horizontal con índices virtuales y escala para la selección. |
| [IsselHeaderTable](widgets/issel-header-table.md) | Encabezado de tabla construido con pills y columnas de igual ancho. |
| [IsselRowTable](widgets/issel-row-table.md) | Fila de celdas IsselPill distribuidas con ancho equivalente. |
| [IsselTableWidget](widgets/issel-table-widget.md) | Tabla de encabezado fijo y filas con desplazamiento vertical. |

## Tema

| Componente | Función |
| --- | --- |
| [IsselThemeSelector](widgets/issel-theme-selector.md) | Selector responsive de sistema, claro y oscuro con miniaturas de las paletas. |

## Escritorio

| Componente | Función |
| --- | --- |
| [IsselDesktopScaffold](widgets/issel-desktop-scaffold.md) | Shell que combina sidebar, caption y contenido con adaptación al ancho. |
| [IsselDesktopCaption](widgets/issel-desktop-caption.md) | Barra global con título/breadcrumbs y slots de acciones, arrastre y ventana. |
| [IsselCaptionButton](widgets/issel-caption-button.md) | IconButton compacto con tooltip, foco y tamaño configurables. |
| [IsselBreadcrumbs](widgets/issel-breadcrumbs.md) | Ruta visual acotada con etiquetas, navegación y copia opcionales. |
| [IsselNavigationPane](widgets/issel-navigation-pane.md) | Menú lateral con selección controlada, destinos desplazables y slots. |

## Utilidad de pintura

- [GradientBorderPainter](widgets/gradient-border-painter.md): borde degradado con animación externa.

Consulta las notas de cada ficha para conocer el comportamiento de sus propiedades. Un valor predeterminado del constructor no garantiza que el componente aplique ese parámetro.
