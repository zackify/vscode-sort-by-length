export default text => {
  let imports = text
    .filter(
      line =>
        line.startsWith('import') && (line.endsWith('"') || line.endsWith(';'))
    )
    .sort((a, b) => a.length - b.length);

  let code = text.filter(
    line =>
      !line.startsWith('import') ||
      (line.startsWith('import') &&
        (!line.endsWith('"') && !line.endsWith(';')))
  );

  return `${imports.join('\n')}\n${code.join('\n')}`;
};
