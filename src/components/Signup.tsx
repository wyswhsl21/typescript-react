import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  interface Infomation {
    password: string;
    email?: string;
  }
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isEnable, setIsEnable] = useState(false);

  const navigate = useNavigate();

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.includes("@") === false || password.length < 8) {
      alert("올바른 이메일 형식이 아닙니다.");
      setIsEnable(!isEnable);
    } else {
      setInfo({ email: email, password: password });
      async function signup() {
        try {
          const { data } = await axios.post(
            "https://pre-onboarding-selection-task.shop/auth/signup",
            { email: info.email, password: info.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data);
          window.localStorage.setItem("token", data.access_token);
          setInfo({ email: "", password: "" });
          navigate("/signin");
        } catch (error) {
          console.log(error);
        }
      }

      signup();
    }
  };
  console.log(email);
  console.log(password.length);
  console.log(info);
  return (
    <Container>
      <Wrap>
        email
        <LoginInput
          type="text"
          data-testid="email-input"
          onChange={nameHandler}
          value={email}
        />
        password
        <PasswordInput
          type="password"
          required
          pattern=".{8,}"
          data-testid="password-input"
          minLength={8}
          onChange={emailHandler}
          value={password}
        />
        <BtnDiv>
          <LoginBtn
            onClick={SubmitHandler}
            data-testid="signin-button"
            disabled={isEnable}
          >
            로그인버튼
          </LoginBtn>
          <SigninBtn data-testid="signup-button" onClick={SubmitHandler}>
            회원가입 버튼
          </SigninBtn>
        </BtnDiv>
      </Wrap>
    </Container>
  );
};

export default Signup;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const Wrap = styled.form`
  margin: 0 auto;
  width: 600px;
  height: 800px;
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 50px;
  gap: 20px;
`;
const LoginInput = styled.input`
  width: 400px;
  height: 30px;
`;
const PasswordInput = styled.input`
  width: 400px;
  height: 30px;
`;
const LoginBtn = styled.button`
  width: 300px;
  height: 50px;
`;
const SigninBtn = styled.button`
  width: 300px;
  height: 50px;
`;

const BtnDiv = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
