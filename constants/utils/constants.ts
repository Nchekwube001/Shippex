import {Platform} from 'react-native';
export const appName = 'Shippex';
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern =
  /^(?=.*[0-9])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{6,64}$/;
export const passwordText =
  'Enter a valid password, your pasword must contain a capital letter, an uppercase letter and a special character';
export const otpLength = 6;

const isIos = Platform.OS === 'ios';
