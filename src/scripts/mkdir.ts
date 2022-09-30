import fs from 'fs-extra';
import path from 'path';
import iconfont from '../styles/iconfont.json';

const root = path.resolve(__dirname, '../', 'iconfont');

const icons = iconfont.glyphs;

try {
  fs.emptyDirSync(root);
  fs.removeSync(path.resolve(__dirname, '../', 'index.ts'));
} catch (e) {
  console.log('remove->', e);
}

const toUpperCaseFirst = (name: string) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

const formatClassName = (name: string) => {
  // 处理常规情况loading、下划线情况round_check_fill
  // const arr = name.split('_');

  // return `icon-${arr.join('')}`;
  return `icon-${name}`;
};

const formatIconFnName = (name: string) => {
  // 处理常规情况loading、下划线情况round_check_fill
  const arr = name.split('_');
  const format = arr.map(n => toUpperCaseFirst(n));

  return `${format.join('')}Icon`;
};

const writeFileContent = (name: string, fontClass: string) => {
  const className = formatClassName(fontClass);
  const n = formatIconFnName(name);

  return `import React, { memo } from 'react';\r
import { View } from '@tarojs/components';\r
import { NativeProps, withNativeProps } from '../../utils/native-props';\r

const ${n} = memo<NativeProps>(props => {
  return withNativeProps(props, <View className='icon iconfont ${className}' />);
});\r\r
export default ${n};`;
};

const cssContent = `import './styles/iconfont.css';\r\r`;

const writeFileExport = (name: string) => {
  const n = formatIconFnName(name);
  return `export { default as ${n} } from './iconfont/${name}';\r`;
};

fs.writeFileSync(path.resolve(__dirname, '../', 'index.ts'), cssContent, { flag: 'a+' });

for (let i = 0; i < icons.length; i++) {
  const dir = path.resolve(root, icons[i].name);
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      const content = writeFileContent(icons[i].name, icons[i].font_class);
      try {
        fs.writeFileSync(path.resolve(dir, 'index.tsx'), content);
      } catch (e) {
        console.log('writeError->', e);
      }
      const content2 = writeFileExport(icons[i].name);
      try {
        fs.writeFileSync(path.resolve(__dirname, '../', 'index.ts'), content2, { flag: 'a+' });
      } catch (e) {
        console.log('writeError->', e);
      }
    }
  } catch (e) {
    console.log('mkdir->', e);
  }
}
