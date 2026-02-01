
export interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth:boolean;
}
export interface LoginPayload {
  email: string;
  password: string;
}

type ValidatorFn = (value: any) => string;
export interface CustomInputProps {
  type?: string;
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  name?: string;
  validator?:  ValidatorFn|null;
}
