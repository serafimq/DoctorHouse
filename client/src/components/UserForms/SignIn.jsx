import { Form, Input, Button, Select, Row } from 'antd';
import { Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router';
import { signin } from '../../redux/actionCreators/userAC';

const { Title } = Typography;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignIn = () => {

  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(signin(values))
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case 'doctor':
        form.setFieldsValue({
          note: 'Привет врач!',
        });
        return;

      case 'patient':
        form.setFieldsValue({
          note: 'Привет пациент!',
        });
        return;
    }
  };

  const isAuth = useSelector(state => state.user.isAuth) 

  return (
    isAuth ?
    <Redirect to="/"/>
    :
    <>
    <Row justify="center">
      <Title>Форма авторизации</Title>
    </Row>
    <Row justify="center">
    <Form {...layout} form={form} name="basic control-hooks" initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

      <Form.Item
        name="role"
        label="Кто Вы?"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Выберите из списка"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="doctor">Врач</Option>
          <Option value="patient">Пациент</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите электронную почту!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="pass"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>

    </Form>
    </Row>
    </>
  );
};

export default SignIn
