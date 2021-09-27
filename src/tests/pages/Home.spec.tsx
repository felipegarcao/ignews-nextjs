import { render, screen} from '@testing-library/react';
import Home from '../../pages';


jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null,false]
  }
})

describe('Home Page', () => {
  it('Renders Correctly', () => {



    render(
      <Home product={{priceId: 'fake-priceId', amount: 'R$10,00'}}  />
    )

    expect(screen.getByText("For R$10,00 month")).toBeInTheDocument()
  })
})