import {ScaledSheet} from 'react-native-size-matters';
import pallete from '../../constants/colors/pallete';
const inputStyles = ScaledSheet.create({
  iconView: {
    position: 'absolute',
    right: 0,
    width: '38@s',
  },
  searchView: {
    position: 'absolute',
    left: 0,
    width: '38@s',
  },
  borderRight: {
    borderRightWidth: 1,
    // borderRightColor: pallete.primaryGrey200,
  },
  br8: {
    borderRadius: '12@s',
  },
  br16: {
    borderRadius: '16@s',
  },
  focusedStyle: {
    borderWidth: '1@s',
    borderColor: pallete.primaryDefault,
    // borderBottomLeftRadius: '4@s',
    // borderBottomRightRadius: '4@s',
  },
  errorStyle: {
    borderWidth: '1@s',
    borderColor: pallete.error,
    // borderBottomLeftRadius: '4@s',
    // borderBottomRightRadius: '4@s',
  },
  pinInput: {
    flexDirection: 'row',
    marginTop: '20@s',
    paddingHorizontal: '17@s',
    borderRadius: 50,
  },
  pin: {
    width: '38@s',
    height: '38@s',
    marginHorizontal: '5@s',
  },
  borderRed: {
    borderColor: pallete.error,
  },
  inputHeight: {
    height: '46@s',
  },
} as Record<any, any>);

export default inputStyles;
