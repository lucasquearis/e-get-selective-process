import styled from "styled-components";
import { SyntheticEvent, useState } from "react";
import { SyledButton } from "../../components/Button";
import { DefaultContent } from "../../components/DefaultContent";
import { BoxFormLogin } from "../../components/Form";
import { StyledInput } from "../../components/Input";
import { StyledLabel } from "../../components/Label";
import { ErrorLoginText } from "../../components/Text/Error";

function Register() {
  const [registerError, setRegisterError] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // @ts-ignore
    const [{ value: userName }, { value: password }] = event.target;
    if (!userName || !password) {
      return setRegisterError("Username and Password are required!");
    }
  };

  return (
    <DefaultContent>
      <BoxFormLogin onSubmit={handleSubmit}>
        <StyledLabel>
          Username:
          <StyledInput />
        </StyledLabel>
        <StyledLabel>
          Password:
          <StyledInput type="password" />
        </StyledLabel>
        <div>
          {registerError && <ErrorLoginText>{registerError}</ErrorLoginText>}
        </div>
        <SyledButton onClick={() => {}}>Register</SyledButton>
      </BoxFormLogin>
    </DefaultContent>
  );
}

export default Register;
