import { View } from '@tarojs/components';
import React, { memo } from 'react';
import { NativeProps, withNativeProps } from '../utils/native-props';

const Wrapper = memo<NativeProps>(props => {
  return withNativeProps(props, <View className='icon iconfont' />);
});

export default Wrapper;
