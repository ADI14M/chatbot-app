export function ago(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString();
}
