import {createBox} from '@shopify/restyle';
import {ComponentProps} from 'react';
import {Theme} from '../../constants/theme/theme';

const Box = createBox<Theme>();

export type BoxProps = ComponentProps<typeof Box>;

export default Box;
