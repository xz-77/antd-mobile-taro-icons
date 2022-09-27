import { ReactNode } from 'react';
import wrapper from './iconfont/wrapper';
import './styles/iconfont.css';

const iconsItem = ['check', 'close', 'notification'];

const iconsName = iconsItem.map(icon => {
  const [first, ...name] = icon;
  return `${first.toUpperCase()}${name}Icon`;
});

const iconfont: Record<typeof iconsName[number], ReactNode> = {};

for (let i = 0; i < iconsItem.length; i++) {
  const className = `icon-${iconsItem[i]}`;

  iconfont[iconsName[i]] = wrapper(className);
}

console.log(iconfont);

// export { iconfont };
