// https://stackoverflow.com/a/10284006
const zip = (rows) => rows[0].map((_, c) => rows.map((row) => row[c]));

export default zip;
