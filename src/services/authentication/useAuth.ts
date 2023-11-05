import { useMutation } from '@apollo/client'

import { LOGIN, REGISTER } from '@/services/authentication/queries'
import { useToast } from '@components/ui/use-toast'
import { apolloClient } from '@lib/graphql'
import { gql } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { type Address } from '@components/DashBoard/types'

// TODO - get graphql type from auto generated types from graphql codegen
type UserResponseType = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'Admin' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze'
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

export type UserInfoFragment = {
  __typename: string
  id: string
  user: UserResponseType
  primaryAddress: Address
}

const useAuth = () => {
  const router = useRouter()

  const { toast } = useToast()
  const [
    loginRequest,
    // TODO - use client to reset store when backend is ready
    // {client: afterLoginClient}
  ] = useMutation<LoginMutation>(LOGIN)
  const [
    registerRequest,
    // TODO - use client to reset store when backend is ready
    // {client: afterRegisterClient}
  ] = useMutation<RegisterMutation>(REGISTER)

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponseType> => {
    try {
      const response = await loginRequest({
        variables: { email, password },
        // TODO - use client to reset store when backend is ready
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
        // TODO - use client to reset store when backend is ready
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

  // TODO - remove write fragment directly to apollo client cache when backend is ready
  const writeUserInfoToFragment = (
    email: string,
    firstName = 'testFirstName',
    lastName = 'testLastName'
  ) => {
    apolloClient.writeFragment({
      id: 'Auth:1',
      fragment: gql`
        fragment UserInfo on Auth {
          id
          user {
            id
            email
            firstName
            lastName
            role
          }
          primaryAddress {
            id
            streetNumber
            streetName
            city
            province
            postal
          }
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
          role: 'Gold',
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

  const readUserInfoFromFragment = () => {
    const data: UserInfoFragment | null = apolloClient.readFragment({
      id: 'Auth:1',
      fragment: gql`
        fragment UserInfo on Auth {
          id
          user {
            id
            email
            firstName
            lastName
            role
          }
          primaryAddress {
            id
            streetNumber
            streetName
            city
            province
            postal
          }
        }
      `,
    })
    return data
  }

  return {
    login,
    register,
    writeUserInfoToFragment,
    readUserInfoFromFragment,
  }
}

export default useAuth
