import React, { useCallback, useEffect } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ModalForm } from "ui/ModalForm";
import { editUser } from "store/users";
import { editAuth } from "store/auth";

// import { Markdown } from "ui/commonStyles";

import MarkdownEditor from "@uiw/react-markdown-editor";
import styles from "./styles.module.scss";

const ProfileForm = ({ isOpenProfileForm, setIsOpenProfileForm }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  const onCancle = useCallback(() => {
    form.resetFields();
    setIsOpenProfileForm(false);
  }, [setIsOpenProfileForm, form]);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(
        editUser({
          login: values.login,
          signature: values.signature,
          id: authUser.id,
        }),
      );
      dispatch(
        editAuth({
          login: values.login,
          signature: values.signature,
          id: authUser.id,
        }),
      );

      onCancle();
    },
    [dispatch, authUser?.id, onCancle, form],
  );

  useEffect(() => {
    if (isOpenProfileForm) {
      form.setFieldsValue({
        login: authUser.login,
        signature: authUser.signature,
      });
    }
  }, [authUser?.login, authUser?.signature, form, isOpenProfileForm]);

  return (
    <>
      <ModalForm isOpen={isOpenProfileForm} title={"Редактирование профиля"} onClose={onCancle} onSave={form.submit}>
        <Form
          name='profile'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleSubmit}
          autoComplete='off'
          form={form}
        >
          <Form.Item label='Логин' name='login'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Подпись' name='signature'>
            <MarkdownEditor
              className={styles.customMdEditor}
              value={form.getFieldValue("signature")}
              onChange={(signature) => form.setFieldsValue({ signature })}
              height='200px'
              toolbars={["bold", "italic", "image", " quote"]}
              placeholder={"Введите подпись"}
            />
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default ProfileForm;
