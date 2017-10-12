'use strict';

import {
  Range,
  TextDocument,
  TextDocumentWillSaveEvent,
  TextEdit,
  TextEditor,
  window,
  workspace,
} from 'vscode';
import { dirname, extname } from 'path';
import {
  getLanguagesSetting,
  getOnSaveSetting,
  registerWillSaveTextDocument,
  unregisterWillSaveTextDocument,
} from './registration';

function sort(document: TextDocument): string {
  if (!getLanguagesSetting().some(l => document.languageId.includes(l))) {
    return;
  }

  let text = document.getText().split(/\n/);

  let imports = text
    .filter(line => line.startsWith('import'))
    .sort((a, b) => a.length - b.length);

  let code = text.filter(line => !line.startsWith('import'));

  return `${imports.join('\n')}\n${code.join('\n')}`;
}

function getMaxRange(): Range {
  return new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
}

export function sortImports() {
  const { activeTextEditor: editor, activeTextEditor: { document } } = window;

  const sortedText = sort(document);
  if (!sortedText) {
    return;
  }

  return editor.edit(edit => {
    edit.replace(getMaxRange(), sortedText);
  });
}

export function sortImportsOnSave({
  document,
  waitUntil,
}: TextDocumentWillSaveEvent) {
  const edits = Promise.resolve([new TextEdit(getMaxRange(), sort(document))]);
  waitUntil(edits);
}

export async function saveWithoutSorting() {
  const { document } = window.activeTextEditor;

  unregisterWillSaveTextDocument();
  await document.save();
  if (getOnSaveSetting()) {
    registerWillSaveTextDocument();
  }
}
