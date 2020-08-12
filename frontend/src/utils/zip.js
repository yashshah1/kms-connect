// https://stackoverflow.com/a/10284006
export default function zip(rows) {
  return rows[0].map((_, c) => rows.map(row => row[c]));
}
