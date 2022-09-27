import fs from 'fs-extra';
import path from 'path';
import iconfont from '../styles/iconfont.json';

const root = path.resolve(__dirname, '../', 'iconfont');

const icons = iconfont.glyphs.map(config => config.name);

try {
  fs.emptyDirSync(root);
} catch (e) {
  console.log('remove->', e);
}

const toUpperCaseFirst = (name: string) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

const writeFileContent = (icon: string) => {
  const arr = icon.split('_');
  // 处理常规情况loading、下划线情况round_check_fill
  const className = `icon-${arr.join('')}`;
  const format = arr.map(n => toUpperCaseFirst(n));

  const n = `${format.join('')}Icon`;

  return `import React from 'react';
import Wrapper from '../../wrapper';

const ${n} = <Wrapper className="${className}" />;

export default ${n};`;
};

for (let i = 0; i < icons.length; i++) {
  const dir = path.resolve(root, icons[i]);
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      const content = writeFileContent(icons[i]);
      try {
        fs.writeFileSync(path.resolve(dir, 'index.tsx'), content);
      } catch (e) {
        console.log('writeError->', e);
      }
    }
  } catch (e) {
    console.log('mkdir->', e);
  }
}
