import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')


describe('SignInButton Component', () => {
  it('renders Correctly when user is not Authenticated', () => {
    // verificar para o usuário não autenticado
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SignInButton />
    )


    expect(screen.getByText('Sign in With Github')).toBeInTheDocument()
  })

  it('Renders Correctly when User is Authenticated', () => {
    // verificar se o usuário esta corretamente Logado
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        expires: 'fake-expires'
      },
      false
    ])

    render(
      <SignInButton />
    )


    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

})


