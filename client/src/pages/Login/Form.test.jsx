import {render, fireEvent, waitFor, screen, getByTestId } from "@testing-library/react";
import {Provider} from "react-redux";
import { legacy_createStore as createStore } from 'redux';
import {MemoryRouter} from "react-router-dom"; // Import MemoryRouter
import Form from "./Form";

const reducer = (state = {}, action) => state;
const store = createStore(reducer);

//FIX: ERROR WITH MATERIAL UI NOT ABLE TO GET LABEL FROM <TEXTFIELD/>
// test("registers user successfully", async () => {
//  const {getByTestId, getByText} = render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <Form />
//       </MemoryRouter>s
//     </Provider>
//   );

//   // Mock the fetch API
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           user: {id: 1, name: "John Doe"},
//           token: "token",
//         }),
//     })
//   );


//   const firstNameInput = getByTestId('testFirstName')
//   const lastNameInput = screen.getByLabelText(/^Last Name/i)
//   const emailInput = screen.getByLabelText(/^Email/i)
//   const passwordInput = screen.getByLabelText(/^Password/i)
//   const locationInput = screen.getByLabelText(/^Location/i)
//   const occupationInput = screen.getByLabelText(/^Occupation/i)

//   // Fill in the registration form
//   fireEvent.change(firstNameInput, {target: {value: "John"}});
//   fireEvent.change(lastNameInput, {target: {value: "Doe"}});
//   fireEvent.change(emailInput, {
//     target: {value: "john@example.com"},
//   });
//   fireEvent.change(passwordInput, {
//     target: {value: "password123"},
//   });
//   fireEvent.change(locationInput , {
//     target: {value: "New York"},
//   });
//   fireEvent.change(occupationInput, {
//     target: {value: "Developer"},
//   });

//   // Trigger form submission
//   fireEvent.click(getByText("REGISTER"));

//   // Wait for the registration to complete
//   await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

//   // Assertions
//   expect(global.fetch).toHaveBeenCalledWith(
//     "http://localhost:3001/auth/register",
//     expect.objectContaining({
//       method: "POST",
//       body: expect.any(FormData),
//     })
//   );
// });

test("logs in user successfully", async () => {
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    </Provider>
  );

  // Mock the fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          user: {id: 1, name: "John Doe"},
          token: "token",
        }),
    })
  );

  // Fill in the login form
  fireEvent.change(getByLabelText("Email"), {
    target: {value: "john@example.com"},
  });
  fireEvent.change(getByLabelText("Password"), {
    target: {value: "password123"},
  });

  // Trigger form submission
  fireEvent.click(getByText("LOGIN"));

  // Wait for the login to complete
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  // Assertions
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:3001/auth/login",
    expect.objectContaining({
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: "john@example.com",
        password: "password123",
      }),
    })
  );
});
