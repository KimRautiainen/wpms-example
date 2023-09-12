
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../hooks/ApiHooks';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { Card, Input, Button, Text } from '@rneui/themed';
import { Alert } from 'react-native';
import { PropTypes } from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileForm = ({ user }) => {
  const { putUser, checkUserName} = useUser();
  const { setIsLoggedIn, setUser } = useContext(MainContext);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {...user, password: '', confirm_password: ''},
    mode: 'onBlur',
  });

  const update = async (updateData) => {

    try {
      delete updateData.confirm_password
      // Poistetaan tyhjät arvot
      for (const [i,value] of Object.entries(updateData)){
        console.log(i,value);
        if(value === ''){
          delete updateData[i]
        }
      }
      console.log('Toimiiko?', updateData)
      const token = await AsyncStorage.getItem('userToken')
      const updateResult = await putUser(updateData, token);
      console.log('putUser response', updateResult);
      Alert.alert("Success", updateResult.message);
     // setToggleRegister(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card>
      <Card.Title>Update profile</Card.Title>
      <Controller
        control={control}
        rules={{
          minLength: { value: 3, message: 'min length is 3 characters' },
          validate: async (value) => {
            try {
              if(value.length < 3 ){
                return;
              }
              const isAvailable = await checkUserName(value);
              console.log('username available?', value);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
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



      <Controller
        control={control}
        rules={{
          minLength: { value: 5, message: "min lenght is 5 characters" }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            const { password } = getValues();
            if(password.length < 5 ){
              return;
            }
            return value === password ? true : 'Passwords dont match';

          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Confirm password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />

      <Controller
        control={control}
        rules={{
          pattern: {
            // TODO: add better regex for email
            value: /\S+@\S+\.\S+$/,
            message: 'must be valid email',
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="email"

            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: { value: 3, message: 'min length is 3 characters' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="fullname"

            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />

      <Button title="Update" onPress={handleSubmit(update)} />
    </Card>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
}

export default ProfileForm;
