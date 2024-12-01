export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'medium' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}
