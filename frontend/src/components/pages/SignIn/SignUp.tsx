import {
  Box,
  Container,
  Image,
  HStack,
  Button,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';
import Logo from '../../../assets/logo.svg';
import { SignUpPayload } from './interface';
import { getSignupSchema } from '../../validations';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../../common';
import './styles.scss';
import { AuthUser, useSignUpMutation } from '../../../resolvers';
import { useAuthContext } from '../../../contexts';

const SignUp = () => {
  const { signUp, loading, ...signUpResult } = useSignUpMutation();
  const { onUserLogin } = useAuthContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignUpPayload>({
    resolver: yupResolver(getSignupSchema()),
  });

  async function onSubmit(values: SignUpPayload) {
    const phoneNumber = getValues('phoneNumber');
    const email = getValues('email');
    const username = getValues('username');
    const password = getValues('password');
    try {
      await signUp({ phoneNumber, email, username, password }).then(() => {
        if (signUpResult.token) {
          onUserLogin({
            user: (signUpResult.user ?? signUpResult.user) as AuthUser,
            token: String(signUpResult.token ?? signUpResult.token),
          });
        }
      });
    } catch (error) {
      console.error('Sign Up error:', error);
    }
  }

  return (
    <Container
      centerContent
      maxW="md"
      h="100vh"
      justifyContent="center"
      className="login-container"
    >
      <Box
        p="2rem"
        boxShadow="0px 4px 40px rgba(0, 0, 0, 0.1)"
        borderRadius="16px"
        w="100%"
        bg="#fff"
      >
        <HStack justifyContent={'center'} pb="1rem">
          <Image src={Logo} w="10rem" />
        </HStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormInput
              label="Name*"
              type="text"
              {...register('username')}
              error={errors.username?.message}
            />
            <FormInput
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <FormInput
              label="Phone Number*"
              type="text"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
            <FormInput
              label="Password*"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
            <FormInput
              label="Confirm Password*"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              backgroundColor={'#542454'}
              color="#fff"
              _hover={{ backgroundColor: '#7b4e7b' }}
              isLoading={isSubmitting}
              loadingText="Signing Up..."
              width="full"
              mt={4}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <HStack justifyContent="center" fontSize={'small'} mt="6">
          <Text> Already have an account?</Text>
          <Link
            href="/sign-in"
            textDecoration="underline"
            color={'#e3863f'}
            fontWeight={'600'}
          >
            Sign In
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default SignUp;
