# GradientBorderPainter

Utilidad de pintura exportada por el barrel público. Extiende `CustomPainter`; no es un widget de pantalla.

## API

```dart
GradientBorderPainter(Animation<double> animation, Color color)
```

Ambos argumentos son posicionales y requeridos. `animation` también se utiliza como `repaint` del pintor. `color` es mutable en esta implementación. Los métodos públicos son `paint(Canvas canvas, Size size)` y `shouldRepaint(covariant CustomPainter oldDelegate)`.

El pintor rota un degradado según `animation.value`, dibuja un RRect de radio fijo 20 y utiliza trazo de 4. `shouldRepaint` devuelve siempre true. La app es dueña de la animación y debe liberarla. El trazo puede sobresalir de los límites del rectángulo; permite espacio apropiado.

## Ejemplo completo

<!-- dart-file: lib/doc_samples/gradient_border_example.dart -->
```dart
import 'package:flutter/material.dart';
import 'package:issel_code_widgets/issel_code_widgets.dart';

class GradientBorderExample extends StatefulWidget {
  const GradientBorderExample({super.key});

  @override
  State<GradientBorderExample> createState() => _GradientBorderExampleState();
}

class _GradientBorderExampleState extends State<GradientBorderExample>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animation;

  @override
  void initState() {
    super.initState();
    _animation = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat();
  }

  @override
  void dispose() {
    _animation.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.all(4),
        child: CustomPaint(
          foregroundPainter: GradientBorderPainter(
            _animation,
            Theme.of(context).colorScheme.primary,
          ),
          child: const SizedBox(
              width: 160, height: 80, child: Center(child: Text('Borde'))),
        ),
      );
}
```

[Código fuente](https://github.com/IsselCode/issel_code_widgets/blob/main/lib/custom_paints/gradient_border_painter.dart). El indicador Issel utiliza este pintor internamente.
