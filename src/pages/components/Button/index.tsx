import { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";
import { ButtonStyled } from "./index.styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly customStyles?: CSSProperties;
}

function Button({ children, customStyles, ...rest }: ButtonProps) {
  return (
    <ButtonStyled style={{ ...customStyles }} {...rest}>
      {children}
    </ButtonStyled>
  );
}

export default Button;
