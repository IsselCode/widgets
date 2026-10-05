# Issel Code Widgets · documentación

Sitio de documentación en español construido con Mintlify. Los archivos Markdown de `assets/` alimentan las guías, los ejemplos y la referencia pública del paquete Flutter `issel_code_widgets` y su skill.

## Ejecutar localmente

Necesitas Node.js 22 o posterior y acceso a Internet para la primera descarga del cliente de Mintlify.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El arranque prepara los logos y convierte los Markdown antes de iniciar la vista previa. No necesitas instalar Mintlify globalmente.

En PowerShell, si la política del sistema bloquea `npm.ps1`, usa los ejecutables `.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

La búsqueda nativa de la vista previa requiere una sesión de Mintlify. Puedes activar tu cuenta con `npx mint login`. La lectura y la navegación del sitio funcionan sin iniciar sesión.

## Editar la documentación

- Edita los `.md` en `assets/guia`, `assets/ejemplos`, `assets/referencia` y `assets/mantenimiento`.
- Ejecuta `npm run docs:sync` para actualizar las páginas MDX y `content-map.json`.
- Edita `index.mdx` y `quickstart.mdx` para cambiar la portada y el inicio rápido.
- Configura los grupos, pestañas y apariencia en `docs.json`.
- Mantén los logos originales en `assets/logos`. Ejecuta `npm run brand:sync` para preparar su presentación SVG.

`marked` es la dependencia que lee Markdown. El importador añade frontmatter, convierte enlaces relativos en rutas del sitio y conserva los bloques Dart y Mermaid. Las páginas generadas se incluyen en la carpeta del proyecto para que Mintlify pueda publicarlas sin ejecutar scripts durante el despliegue.

Al añadir una página, agrega su ruta a la navegación de `docs.json`. `content-map.json` indica la ruta generada para cada fuente. Los widgets utilizan URLs cortas `componentes/nombre-del-widget` que funcionan también con las herramientas de Mintlify en Windows.

## Comprobar los cambios

```bash
npm test
npm run validate
```

Las pruebas cubren enlaces, código protegido y el ciclo de generación. La validación prepara la marca, sincroniza fuentes, compila MDX, revisa destinos y ejecuta las comprobaciones oficiales de Mintlify. Para comprobar sólo MDX y enlaces locales, usa `npm run check`.

## Fuentes

Las nueve guías y los logos proceden de los assets iniciales. Los ejemplos, las fichas y las capturas se incorporaron desde la documentación local del paquete. El sitio y su generación son autosuficientes: no necesitan rutas del equipo del autor.

La validación de este proyecto comprueba la plataforma de documentación. La skill se utiliza como referencia de contenido; el sitio no ejecuta Flutter. Para usar el paquete, elige un SDK moderno y valida la combinación: no se establece un mínimo que no se haya probado.

Los [créditos y licencias](assets/referencia/creditos.md) reconocen las dependencias del paquete, las herramientas del sitio, la tipografía y los iconos. Edita esa fuente Markdown y ejecuta `npm run docs:sync` cuando cambies los reconocimientos; la página aparece en la referencia y en el pie del sitio.

## Publicar

Conecta esta carpeta como repositorio de documentación en tu cuenta de Mintlify. Publica `docs.json`, las páginas MDX generadas, `custom.css`, los logos y las imágenes. Después de modificar Markdown, ejecuta la sincronización antes de subir cambios.

Consulta [Mintlify: desarrollo local](https://www.mintlify.com/docs/cli) y [configuración del sitio](https://www.mintlify.com/docs/organize/settings) para los comandos y ajustes de la plataforma.
