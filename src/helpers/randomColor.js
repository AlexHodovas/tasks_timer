export default function randomColor() {
  let r,
    g,
    b,
    color = null;
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

  return color;
}
