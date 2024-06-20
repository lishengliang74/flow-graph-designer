# flow-graph-designer

A react component that make flow graph by drag & drop.

!!! This repository was originally published in 2018. As my original GitHub account was lost, I have transferred it to my newly applied account. !!!

**feature**

- auto layout
- colorized node
- mouse drag & drop support
- copy & paste whether in one page or across multi pages
- undo/redo support
- action detail info

![demo image](https://raw.githubusercontent.com/censoft-corp/flow-graph-designer/master/demo.png?time=20181213)
## useage

**install:**

```
npm install flow-graph-designer
```

**use:**

```
import React from 'react';
import getFlowDesignerComponent from 'flow-graph-designer'
const FlowDesignerComponent = getFlowDesignerComponent({lang: 'zh_CN'});

const template={...}  
...
React.render(
  document.getElementById('app'),
  <FlowDesignerComponent
    data={{id: 'root', children: []}},
    template={template}
    theme="theme-1"
  />
)
```

**props**

theme:

valid values from ```theme-1``` to ```theme-8```

template:

```
const template = {
  id: "default",
  nodes: [
    "open",
    "click",
    "data",
    "input",
    "verification",
    "dropdown",
    "loop",
    "switch",
    "mouse-enter",
    "stop-loop",
    "stop",
    "case",
  ],
  entities: {
    node: {
      open: {
        id: "open",
        type: "normal",
        icon:
          "data:image/png;base64...U5ErkJggg==",    // src of icon on iconbar, could be base64 image or image url.
        props: {
          action: "open-page",
          name: "open page",
          type: "normal",
          showInToolbar: "Y",   // should show in toolbar
        },
      },
      ...
    }
  }
}
```

data:

```
{
  id: 'root',
  type: 'normal',
  action: 'root',
  name: 'root node'
  children: [
    id: '001',
    type: 'normal',     // control flow, value is one of : normal, loop, switch, case, stop-loop, stop
    action: 'open',     // for specifying the meaning of the node.
    children: [
      ...
    ]
  ]
}
```
## develop

**clone**
```
git clone https://github.com/censoft-corp/flow-graph-designer.git
```

**init**
```
yarn
```

or 

```
npm install
```

**start**
```
yarn run start
```

or 

```
npm run start
```

**playground**

there are a playground site.The url is  http://localhost:8080/

![playground image](https://raw.githubusercontent.com/censoft-corp/flow-graph-designer/master/playground.png)

## publish

set npm register server if necessary
```
npm config set registry https://registry.npmjs.org/
```

npm login, run once
```
npm login
...
```

everytime:
```
npm run publish-to-npm
```

restore npm register server to tapbao image if you wish
```
npm config set registry https://registry.npm.taobao.org
```
