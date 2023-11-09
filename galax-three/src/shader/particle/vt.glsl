attribute float scale;
attribute vec3 color;
varying vec3 vColor;
void main() {
    vColor = color;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = scale;
    gl_PointSize *= 100. / -(modelViewMatrix * vec4(position, 1.0)).z;
}
