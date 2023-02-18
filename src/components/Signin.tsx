import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signin = () => {
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
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.includes("@") === false) {
      alert("올바른 이메일 형식이 아닙니다.");
    } else {
      setInfo({ email: email, password: password });
      async function signin() {
        try {
          const { data } = await axios.post(
            "https://pre-onboarding-selection-task.shop/auth/signin",
            { email: info.email, password: info.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data);
          setInfo({ email: "", password: "" });
          navigate("/todo");
        } catch (error) {
          console.log(error);
        }
      }
      signin();
    }
  };
  console.log(email);
  console.log(password);
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
          onChange={emailHandler}
          value={password}
        />
        <BtnDiv>
          <LoginBtn onClick={SubmitHandler} data-testid="signin-button">
            로그인버튼
          </LoginBtn>
        </BtnDiv>
      </Wrap>
    </Container>
  );
};

export default Signin;
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

const BtnDiv = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
