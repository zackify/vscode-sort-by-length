# Sort Imports By Length

## What?

Turns 

```js
import styles from './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
```

Into 

```js
import React from 'react';
import styles from './style.scss';
import { Link } from 'react-router-dom';
```

on file save! 


## Thanks

Huge shout out to [peterjuras](https://github.com/peterjuras/vsc-sort-imports) for his sort imports in vs code plugin. It just doesn't do it by line length, so I used his code to make this.