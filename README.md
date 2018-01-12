# 本地启动项目
npm run start | npm start

# build项目
npm run build | npm build

# 启动模拟数据
node mock

# 其他设置说明
开发模式下，存在本地模拟环境和dev环境的切换，为了方便，在config文件夹下新增了一个development.env.js。可以在这里设置区分两个环境。

# 重要事项说明

desciption: 选用富文本编辑器react-draft-wysiwyg。选用原因：对比了三个富文本编辑器，ueditor、wangeditor和react-draft-wysiwyg。ueditor的特点是大而全，插件丰富，但缺点是重，且依赖jquery；wangeditor是轻量型的，不依赖任何库，且是国内开发者开发，文档中文，对快捷使用有帮助。缺点是不支持工具扩展，如果需要扩展也是可以的，需要去fork，这样成本太高；react-draft-wysiwyg是基于react和draft的封装，对react支持度好，轻量且具有扩展性，缺点是文档是英文。