import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { SyledButton } from "../../components/Button";
import { DefaultContent } from "../../components/DefaultContent";
import { BoxFormLogin } from "../../components/Form";
import { StyledInput } from "../../components/Input";
import { StyledLabel } from "../../components/Label";
import { ErrorText } from "../../components/Text/Error";
import { Heading } from "../../components/Text/Heading";
import Toggle from "../../components/Toggle";
import { createUser } from "../../utils/api";
import { SuccessText } from "../../components/Text/Success";

interface ICheckUserData {
  fullName: string;
  userName: string;
  password: string;
}

const Paragraph = styled.p`
  color: ${({ theme }) => theme.color.brand.primary};
  text-align: center;
`;

function Register() {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [isAnAdministrator, setIsAnAdministrator] = useState(false);
  const [isFetching, setIsFetchig] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sucessTimer, setSuccessTimer] = useState(5);

  const checkUserData = ({ fullName, userName, password }: ICheckUserData) => {
    if (!fullName || !userName || !password) {
      return "All fields are  required!";
    }

    if (fullName.length < 5) {
      return "Full name must contain at least 5 characters!";
    }

    if (userName.length < 5) {
      return "Username must contain at least 5 characters!";
    }

    if (password.length < 5) {
      return "Password must contain at least 5 characters!";
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    // @ts-ignore
    const [{ value: fullName }, { value: userName }, { value: password }] =
      event.target;

    console.log({ fullName, userName, password });
    const errorMessage = checkUserData({ fullName, userName, password });

    if (errorMessage) {
      return setRegisterError(errorMessage);
    }

    setIsFetchig(true);
    const response = await createUser({
      fullName,
      userName,
      password,
      isAnAdministrator,
    });

    if (response?.status === 201) {
      setSuccessMessage("Account created successfully");
    }
  };

  useEffect(() => {
    if (!registerError) return;
    const timer = setTimeout(() => {
      setRegisterError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [registerError]);

  useEffect(() => {
    if (!successMessage) return;
    if (sucessTimer === -1) {
      setIsFetchig(false);
      return navigate("/");
    }
    const intervalId = setInterval(() => {
      setSuccessTimer(sucessTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [successMessage, sucessTimer]);

  return (
    <DefaultContent>
      <BoxFormLogin onSubmit={handleSubmit}>
        <Heading>Register</Heading>
        <StyledLabel>
          Full name:
          <StyledInput />
        </StyledLabel>
        <StyledLabel>
          Username:
          <StyledInput />
        </StyledLabel>
        <StyledLabel>
          Password:
          <StyledInput type="password" />
        </StyledLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle
            checked={isAnAdministrator}
            setChecked={setIsAnAdministrator}
          />
          <Paragraph>I want to be an admin!</Paragraph>
        </div>
        <div style={{ minHeight: 25 }}>
          {registerError && <ErrorText>{registerError}</ErrorText>}
          {successMessage && (
            <SuccessText>
              {successMessage}
              {` redirecting in ${sucessTimer} seconds`}
            </SuccessText>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <SyledButton disabled={isFetching} type="submit">
            Register
          </SyledButton>
          <SyledButton type="button" onClick={() => navigate("/")}>
            Back to Home
          </SyledButton>
        </div>
      </BoxFormLogin>
    </DefaultContent>
  );
}

export default Register;
