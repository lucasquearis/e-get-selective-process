import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { NoStyleButton, StyledButton } from "../../components/Button";
import { BoxForm } from "../../components/Form";
import { StyledInput } from "../../components/Input";
import { StyledLabel } from "../../components/Label";
import { ErrorText } from "../../components/Text/Error";
import { Heading } from "../../components/Text/Heading";
import Toggle from "../../components/Toggle";
import { createUser } from "../../utils/api";
import { SuccessText } from "../../components/Text/Success";
import { useAppSelector } from "../../hooks";
import { ButtonContainer } from "../Login";
import Loading from "../../components/Loading";

interface ICheckUserData {
  fullName: string;
  userName: string;
  password: string;
}

const Paragraph = styled.p`
  color: ${({ theme }) => theme.color.brand[1000]};
  text-align: center;
`;

function Register() {
  const navigate = useNavigate();
  const { user: userRedux } = useAppSelector((state) => state);
  const [registerError, setRegisterError] = useState("");
  const [isAnAdministrator, setIsAnAdministrator] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState({ boolean: false, message: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [sucessTimer, setSuccessTimer] = useState(5);

  const checkUserData = ({ fullName, userName, password }: ICheckUserData) => {
    if (!fullName || !userName || !password) {
      return "Todos os campos são obrigatórios";
    }

    if (fullName.length < 5) {
      return "O nome completo deve conter no mínimo 5 caracteres!";
    }

    if (userName.length < 5) {
      return "O nome de usuário deve conter pelo menos 5 caracteres!";
    }

    if (password.length < 5) {
      return "A senha deve conter no mínimo 5 caracteres!";
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    // @ts-ignore
    const [{ value: fullName }, { value: userName }, { value: password }] =
      event.target;

    const errorMessage = checkUserData({ fullName, userName, password });

    if (errorMessage) return setRegisterError(errorMessage);

    try {
      setIsFetching(true);
      const response = await createUser({
        fullName,
        userName,
        password,
        isAnAdministrator,
      });

      if (response?.status === 201) {
        setSuccessMessage("Conta criada com sucesso!");
      }
    } catch (error: any) {
      setFetchError({ boolean: true, message: error.message });
    }
  };

  useEffect(() => {
    if (userRedux.userName) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (!registerError) return;
    const timer = setTimeout(() => {
      setRegisterError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [registerError]);

  useEffect(() => {
    if (!fetchError.boolean) return;
    setIsFetching(false);
    const timer = setTimeout(() => {
      setFetchError({ boolean: false, message: "" });
    }, 5000);
    return () => clearTimeout(timer);
  }, [fetchError]);

  useEffect(() => {
    if (!successMessage) return;
    if (sucessTimer === -1) {
      setIsFetching(false);
      return navigate("/");
    }
    const intervalId = setInterval(() => {
      setSuccessTimer(sucessTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [successMessage, sucessTimer]);

  return (
    <BoxForm
      style={{ margin: "40px auto", maxWidth: 270 }}
      onSubmit={handleSubmit}
    >
      <Heading>Registre-se!</Heading>
      <StyledLabel>
        Nome completo:
        <StyledInput />
      </StyledLabel>
      <StyledLabel>
        Nome de usuário:
        <StyledInput />
      </StyledLabel>
      <StyledLabel>
        Senha:
        <StyledInput type="password" />
      </StyledLabel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 8,
        }}
      >
        <Toggle checked={isAnAdministrator} setChecked={setIsAnAdministrator} />
        <Paragraph>Eu quero ser um administrador!</Paragraph>
      </div>
      <div>
        {registerError && <ErrorText>{registerError}</ErrorText>}
        {fetchError.boolean && (
          <ErrorText>
            Erro ao carregar api, contate o suporte. Error message:{" "}
            {fetchError.message}
          </ErrorText>
        )}
        {successMessage && (
          <SuccessText>
            {successMessage}
            {` redirecionando em ${sucessTimer} segundos`}
          </SuccessText>
        )}
      </div>
      <ButtonContainer>
        <StyledButton disabled={isFetching} type="submit">
          {isFetching ? <Loading forButton /> : "Registrar"}
        </StyledButton>
        <NoStyleButton
          style={{ marginTop: 25 }}
          type="button"
          onClick={() => navigate("/")}
        >
          <Paragraph>Voltar ao início</Paragraph>
        </NoStyleButton>
      </ButtonContainer>
    </BoxForm>
  );
}

export default Register;
