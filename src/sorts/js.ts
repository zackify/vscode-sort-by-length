export default text => {
  let imports = text
    .filter(line => line.match(/(?!import{)(?!import {)(?!import\()import/))
    .sort((a, b) => a.length - b.length);

  let code = text.filter(
    line => !line.match(/(?!import{)(?!import {)(?!import\()import/)
  );

  return `${imports.join('\n')}\n${code.join('\n')}`;
};
