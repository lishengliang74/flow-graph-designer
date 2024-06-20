# flow-graph-designer

一个通过拖拽方式制作流程图的React组件。

!!! 此仓库最初于2018年发布。由于我原来的GitHub账号丢失，我已将其转移到此新申请的账号。 !!!

If you wish to read the English version of the README, please click here: [English README](https://github.com/lishengliang74/flow-graph-designer/blob/master/README_en.md)

**特点 feature**

- 自动布局
- 节点着色
- 支持鼠标拖拽
- 支持单页面或多页面间复制粘贴
- 支持撤销/重做
- 展示操作详情信息

## 用法

**安装:**

```
npm install flow-graph-designer
```

**使用:**

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

**属性**

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
## 开发

**克隆**
```
git clone https://github.com/lishengliang74/flow-graph-designer.git
```

**安装依赖**

!!!推荐 pnpm
```
pnpm install
```

```
yarn
```

or 

```
npm install
```

**启动开发**
```
pnpm run start
```

**功能展示**

启动开发后将打开功能展示页面， URL 是： http://localhost:8080/

![playground image](https://raw.githubusercontent.com/censoft-corp/flow-graph-designer/master/playground.png)

## 发布

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
npm config set registry https://registry.npmmirror.com
```
