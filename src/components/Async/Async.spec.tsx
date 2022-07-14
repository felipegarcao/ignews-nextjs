import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { Async, AsyncNot } from "."


test('It Renders Correctly', async () => {
  render(<Async />)

  expect(screen.getByText('Hello World')).toBeInTheDocument()
  // Primeira Maneira
  // expect( await screen.findByText('Button')).toBeInTheDocument()

  // Segunda Maneira
  await waitFor(() => {
    return expect(screen.getByText('Button')).toBeInTheDocument()
  })
})


test('It Renders Button Invisible', async () => {
  const { debug } = render(<AsyncNot />)
  debug()

  await waitForElementToBeRemoved(screen.queryByText('Button'))
})