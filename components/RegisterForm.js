
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../hooks/ApiHooks';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { Card, Input, Button, Text } from '@rneui/themed';

const RegisterForm = () => {
  const { postUser, checkUserName } = useUser();
  const { setIsLoggedIn, setUser } = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const register = async (userData) => {

    try {
      const registerResponse = await postUser(userData);
      console.log('postUser response', registerResponse);
      // TODO: fix dofetch() to display errors from API (e.g. when bad user/pw)
      // use loginResponse.user for storing token & userdata
      //await AsyncStorage.setItem('userToken', registerResponse.token);
      //setIsLoggedIn(true);
      //setUser(registerResponse.user);
    } catch (error) {
      console.error(error);
      // TODO: notify user about failed login?
    }
  };

  return (
    <Card>
      <Card.Title>Register</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          validate: async (value) => {
            try {
            const isAvailable = await checkUserName(value);
            console.log('username available?', value);
            return isAvailable ? isAvailable : 'Username taken';
            } catch(error){
              console.error(error);
            }
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

          <Text>{errors.username?.message}</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
          minLength: 5
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="email"

            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="fullname"

            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(register)} />
    </Card>
  );
};


export default RegisterForm;
