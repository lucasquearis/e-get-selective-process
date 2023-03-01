import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NoStyleButton, StyledButton } from "../../components/Button";
import { BoxForm } from "../../components/Form";
import { StyledInput } from "../../components/Input";
import { StyledLabel } from "../../components/Label";
import { ErrorText } from "../../components/Text/Error";
import { Heading } from "../../components/Text/Heading";
import { getUserByUserName, IUser } from "../../utils/api";
import { setUser } from "../../redux/reducers/users";
import Loading from "../../components/Loading";

interface IVerifyUserInDB {
  userName: string;
  password: string;
}

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Paragraph = styled.p`
  span {
    color: ${({ theme }) => theme.color.brand[1000]};
  }
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: userRedux } = useAppSelector((state) => state);
  const [loginError, setLoginError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState({ boolean: false, message: "" });
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setUserLocalStorageAndRedux = (user: IUser) => {
    const { fullName, userName, isAnAdministrator, id } = user;
    const formatUser = { fullName, userName, isAnAdministrator, id };
    dispatch(setUser(formatUser));
    const userJson = JSON.stringify(formatUser);
    localStorage.setItem("user", userJson);
  };

  const verifyUserPassword = (user: IUser, password: string) => {
    if (user?.password === password) {
      setUserLocalStorageAndRedux(user);
      navigate("/home");
    } else {
      setLoginError("Senha incorreta.");
      return setIsFetching(false);
    }
  };

  const verifyUserInDB = async ({ userName, password }: IVerifyUserInDB) => {
    try {
      setIsFetching(true);
      const response = await getUserByUserName({ userName });

      if (!response?.data.length) {
        setLoginError("Usuário não cadastrado.");
        return setIsFetching(false);
      }

      const firstUserRegistered = response.data.find(
        (user) => user.userName === userName
      );

      if (firstUserRegistered) {
        verifyUserPassword(firstUserRegistered, password);
      }
    } catch (error: any) {
      setFetchError({ boolean: true, message: error.message });
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // @ts-ignore
    const [{ value: userName }, { value: password }] = event.target;
    if (!userName || !password) {
      return setLoginError("Nome de usuário e senha são necessários!");
    }
    verifyUserInDB({ userName, password });
  };

  useEffect(() => {
    if (userRedux.userName) {
      navigate("/home");
    }
    userNameRef?.current && userNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (!loginError) return;
    const timer = setTimeout(() => {
      setLoginError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [loginError]);

  useEffect(() => {
    if (!fetchError.boolean) return;
    setIsFetching(false);
    const timer = setTimeout(() => {
      setFetchError({ boolean: false, message: "" });
    }, 5000);
    return () => clearTimeout(timer);
  }, [fetchError]);

  return (
    <BoxForm
      style={{ margin: "40px auto", maxWidth: 250 }}
      onSubmit={handleSubmit}
    >
      <Heading>Login</Heading>
      <StyledLabel>
        Nome de usuário:
        <StyledInput ref={userNameRef} />
      </StyledLabel>
      <StyledLabel>
        Senha:
        <StyledInput type="password" ref={passwordRef} />
      </StyledLabel>
      {loginError && <ErrorText>{loginError}</ErrorText>}
      {fetchError.boolean && (
        <ErrorText>
          Erro ao carregar api, contate o suporte. Error message:{" "}
          {fetchError.message}
        </ErrorText>
      )}
      <ButtonContainer>
        <StyledButton disabled={isFetching} type="submit">
          {isFetching ? <Loading forButton /> : "Entrar"}
        </StyledButton>
        <NoStyleButton
          style={{ marginTop: "30px" }}
          type="button"
          onClick={() => navigate("/register")}
        >
          <Paragraph>
            Ainda não tem cadastro?{" "}
            <span style={{ marginLeft: 4 }}>Registre-se aqui!</span>
          </Paragraph>
        </NoStyleButton>
      </ButtonContainer>
    </BoxForm>
  );
}

export default Login;
