import { CSSProperties, InputHTMLAttributes } from "react";
import { InputStyled, LabelStyled } from "./index.styled";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly labelText: string;
  readonly customStyles?: CSSProperties;
  readonly id?: string;
}

function Input({ id, labelText, customStyles, ...rest }: InputProps) {
  return (
    <>
      <LabelStyled htmlFor={id}>{labelText}</LabelStyled>
      <InputStyled id={id} style={{ ...customStyles }} {...rest} />
    </>
  );
}

export default Input;
