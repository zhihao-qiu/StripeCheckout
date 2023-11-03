import { useMutation } from '@apollo/client'

import { LOGIN, REGISTER } from '@/services/authentication/queries'
import { useToast } from '@components/ui/use-toast'
import { apolloClient } from '@lib/graphql'
import { gql } from '@apollo/client'
import { useRouter } from 'next/navigation'

// TODO - get graphql type from auto generated types from graphql codegen
type UserResponseType = {
  _typename?: 'User'
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

type AuthResponseType =
  | {
      __typename?: 'LoginUserPayload' | 'RegisterUserPayload' | undefined
      token?: string | undefined
      errors: string[]
      user?: UserResponseType | undefined
    }
  | null
  | undefined

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'LoginUserPayload'
    token?: string
    errors: Array<string>
    user?: UserResponseType
  } | null
}

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?:
    | {
        __typename?: 'RegisterUserPayload'
        token?: string
        errors: Array<string>
        user?: UserResponseType
      }
    | null
    | undefined
}

const useAuth = () => {
  const router = useRouter()

  const { toast } = useToast()
  const [loginRequest, { client: afterLoginClient }] =
    useMutation<LoginMutation>(LOGIN)
  const [registerRequest, { client: afterRegisterClient }] =
    useMutation<RegisterMutation>(REGISTER)

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponseType> => {
    try {
      const response = await loginRequest({
        variables: { email, password },

        // onCompleted: () => {
        //   afterLoginClient.resetStore()
        // },
      })

      toast({
        title: 'Login successful',
        description: `Welcome back ${response?.data?.login?.user?.firstName}`,
        duration: 2000,
      })
      return response?.data?.login
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err && { errors: [err.message] }
      }
      // Handle other types of errors
      return { errors: ['Unknown'] }
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponseType> => {
    try {
      const response = await registerRequest({
        variables: { username, email, password },
        // onCompleted: () => {
        //   afterRegisterClient.resetStore()
        // },
      })

      toast({
        title: 'Account created.',
        description: 'We have created your account for you.',
        duration: 2000,
      })
      return response?.data?.register
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err && { errors: [err.message] }
      }

      return { errors: ['Unknown'] }
    }
  }

  const writeUserInfoToFragment = (email: string) => {
    const lastName = 'testLastName'
    const firstName = 'testFirstName'

    apolloClient.writeFragment({
      id: 'Auth:1',
      fragment: gql`
        fragment UserInfo on Auth {
          id
          email
          firstName
          lastName
          role
        }
      `,
      data: {
        __typename: 'Auth',
        id: 'Auth:1',
        user: {
          id: 1,
          email,
          firstName,
          lastName,
          role: 'user',
        },
        primaryAddress: {
          id: 1,
          streetNumber: 123,
          streetName: 'Main St',
          city: 'Toronto',
          province: 'ON',
          postal: 'M1M1M1',
        },
      },
    })
    toast({
      title: 'Login successful',
      description: `Welcome back ${email}`,
      duration: 2000,
    })
    router.push('/dashboard')
  }

  return {
    login,
    register,
    writeUserInfoToFragment,
  }
}

export default useAuth
