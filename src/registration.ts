import { Disposable, workspace } from 'vscode';

import { sortImportsOnSave } from './sort';

let saveRegistration : Disposable;

export function unregisterWillSaveTextDocument() {
  if (!saveRegistration) {
    return;
  }

  saveRegistration.dispose();
  saveRegistration = null;
}

export function registerWillSaveTextDocument() {
  if (saveRegistration) {
    return;
  }

  saveRegistration = workspace.onWillSaveTextDocument(sortImportsOnSave);
}

export function getOnSaveSetting() {
  return workspace.getConfiguration("sortImports").get("onSave");
}

export function getLanguagesSetting(): string[] {
  return workspace.getConfiguration("sortImports").get<string[]>("languages");
}

export function updateSaveRegistration() {
    if (getOnSaveSetting()) {
        registerWillSaveTextDocument();
    } else {
        unregisterWillSaveTextDocument();
    }
}
