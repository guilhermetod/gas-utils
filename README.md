# GASUtils: simple functions to improve your Google Apps Script experience

This has been extracted from a personal library built through years with functions the author found useful to manage Google Apps Script projects.

The main goal of this library is to have functions that support a routine of work based on G Suite products by automating tasks and enforcing a consistent workflow and product design.

This means that some decisions were made on how this library is consumed and how the products that consume it should be built in order for it to work properly. This might result in some design restrictions (e.g [column titles](src/spreadsheet/sheet/sheet-has-column-titles.ts)), but we aim to reduce them as much as possible.

PRs and suggestions are always welcome, especially for products you feel like this library don't cover much.

## ❓ How to use it

Open your project in the Google Apps Script editor, go to libraries and paste the library ID.

```
1K8Yv5CY1K9QJ4S7tR9zI_FeWxS5pHBaGyg18-iQid45oR6U4DafShk0w
```

Alternatively, open your appsscript.json file and add the library ID in the dependencies array.

## 🟦 Typescript support for local development

The types for this project are published to npm. To install it, simply run

```bash
npm install --save-dev gas-utils
```

Since the library identifier choice is up to the end user on it's project, the types are not declared globally, so you have to declare the global object yourself. This can be done in two ways.

Assuming you'll use "GASUtils" as your identifier:

### 1. Create a global.d.ts file in your project's root folder and declare the GASUtils object

```ts
// global.d.ts

declare const GASUtils: typeof import('gas-utils');
```

Then consume it anywhere without the need of further imports

```ts
// get-priority-users.ts

type Users = {
  firstName: string;
  lastName: string;
  age: number;
};

export const getPriorityUsers = (): GASUtils.Row<Users>[] => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User database');
  const rows = GASUtils.getRows<Users>(sheet);

  return GASUtils.searchRows(rows, { age: (value) => value >= 60 });
};
```

### 2. Import the entire module with an alias corresponding to your identifier

```ts
// get-priority-users.ts

import * as GASUtils from 'gas-utils';

type Users = {
  firstName: string;
  lastName: string;
  age: number;
};

export const getPriorityUsers = (): GASUtils.Row<Users>[] => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User database');
  const rows = GASUtils.getRows<Users>(sheet);

  return GASUtils.searchRows(rows, { age: (value) => value >= 60 });
};
```
