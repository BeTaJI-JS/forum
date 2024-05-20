import React, { useEffect, useState } from "react";
import { AuthName, HeaderContent, HeaderTabs, LogOutBtn, Logo, TitleGM } from "./styles";
// import logo from "../../assets/logo.png";
import logo from "../../assets/GM_logo.png";

import IconUser from "../../assets/user.svg?react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../ui/Forms/Auth";
import { removeAuth } from "../../store/auth";
import { persistor } from "../../store";
import { useCookies } from "react-cookie";
import { removeUsers } from "../../store/users";
import { Button } from "../ButtonsBar/styles";

export const Header = () => {
  const dispatch = useDispatch(); // TODO тоже убрать отсюда позже
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const [cookies, removeCookies] = useCookies(["userInfo"]);

  const navigate = useNavigate();

  //TODO придумать логику по разлогину и чистке куки

  const authUser = useSelector((state) => state.auth);

  console.log("cookies.userInfo===>", cookies.userInfo);
  useEffect(() => {
    if (!cookies.userInfo) {
      console.log("Сброс авторизации");
      dispatch(removeAuth());
    }
  }, [dispatch, cookies, removeAuth]);

  // useEffect(() => {
  //   return () => {
  //     persistor.flush().then(() => {
  //       console.log("persistor.purge()!!!! чистим локалсторадж");
  //       persistor.purge();
  //       removeUsers();
  //       if (cookies.userInfo) {
  //         cookies.removeCookies("userInfo");
  //         // removeCookies("userInfo");
  //       }
  //     });
  //   };
  // }, [persistor, cookies, removeCookies, removeUsers]);

  return (
    <>
      <HeaderContent>
        <Logo>
          <img href='#' src={logo} alt='logo' />
        </Logo>
        <TitleGM>General Motors Club</TitleGM>
        <HeaderTabs>
          {authUser?.login && <Button onClick={() => navigate("forum/profile")}>Личный кабинет</Button>}
          <AuthName>
            {authUser?.login ? `Выполнен вход: ${authUser?.login}` : "не авторизованный пользователь"}
          </AuthName>
          <IconUser onClick={() => setOpenAuthModal((prev) => !prev)} />
          {authUser?.login && (
            <LogOutBtn
              onClick={() => {
                removeCookies("userInfo");
                dispatch(removeAuth());
              }}
            >
              Выйти
            </LogOutBtn>
          )}
        </HeaderTabs>
      </HeaderContent>
      <AuthForm open={openAuthModal} setOpen={setOpenAuthModal} />
    </>
  );
};

export default Header;
