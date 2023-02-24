import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SyledButton } from "../../components/Button";
import { DefaultContent } from "../../components/DefaultContent";
import { BoxFormLogin } from "../../components/Form";
import { StyledInput } from "../../components/Input";
import { StyledLabel } from "../../components/Label";
import { ErrorLoginText } from "../../components/Text/Error";

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userNameRef?.current && userNameRef.current.focus();
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // @ts-ignore
    const [{ value: userName }, { value: password }] = event.target;
    if (!userName || !password) {
      return setLoginError("Username and Password are required!");
    }
  };

  useEffect(() => {
    if (!loginError) return;
    const timer = setTimeout(() => {
      setLoginError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [loginError]);

  return (
    <DefaultContent>
      <BoxFormLogin onSubmit={handleSubmit}>
        <StyledLabel>
          Username:
          <StyledInput ref={userNameRef} />
        </StyledLabel>
        <StyledLabel>
          Password:
          <StyledInput type="password" ref={passwordRef} />
        </StyledLabel>
        <div>{loginError && <ErrorLoginText>{loginError}</ErrorLoginText>}</div>
        <ButtonContainer>
          <SyledButton type="submit">Login</SyledButton>
          <SyledButton onClick={() => navigate("/register")}>
            Register
          </SyledButton>
        </ButtonContainer>
      </BoxFormLogin>
    </DefaultContent>
  );
}

export default Login;
