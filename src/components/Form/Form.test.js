import Form from "./Form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

xit ("should render the form", () => {  /**It has 2 parameters, 1st is the name, "should render the form" is the name of the Test. 2nd is the function that starts from ()=>{all the content} */

  // 1. Arrange 
  render (<Form/>);

  // 2. Act
  const form = screen.getByRole("form") /* this is referring to the name attribute => name="form" in Form.jsx */

  // 3. Assert
  expect(form).toBeInTheDocument();
})

// Test 2
xit ("should render the basic input fields", () => {  

  // 1. Arrange 
  render (<Form/>);

  // 2. Act
  const nameInput = screen.getByRole("textbox", { name: /name/i}) 
  /* this is referring to label which is referrencing to Input name "Name" in Form.jsx 
  name: is referring to accessible element for testing. it is the syntax
  /name is referring to exact Name word in label
  /i is to make case-insensitive */

  //const emailInput = screen.getByRole("textbox", { name: /email/i }) /* this is referring to label which is referrencing to Input name "Email" in Form.jsx 
  //       name: is referring to accessible element for testing. it is the syntax
  //      /email is referring to exact Email word in label
  //      /i is to make case-insensitive */

  const emailInput = screen.getByPlaceholderText(/e.g. test@test.com/i) /* this is referring to placeholder="e.g. test@test.com" in Form.jsx */


  // 3. Assert
  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeTruthy();

  // Part 2 of Test 2
  // getAllBy
  const inputs = screen.getAllByRole("textbox")
  inputs.forEach(input => {
    expect(input).toBeInTheDocument();
  })
})

// Test 3
xit("should not render error or success message on load", () => {
  render (<Form/>)
  const errorMessage = screen.queryByText(/Sorry something went wrong/i)
  expect(errorMessage).toBeFalsy()
  expect(errorMessage).not.toBeInTheDocument(); /* works same as previous line, however more meaningful*/

  const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i)
  expect(errorMessage).not.toBeInTheDocument(); 
})

// Test 4 => Ensuring the form has invalid inputs & giving the error message as per Form.jsx

xit("should not submit the form with invalid fields", () => {
  //Arrange
  render (<Form/>)

  //Act
  const nameInput = screen.getByRole("textbox", { name: /name/i})
  userEvent.type(nameInput, "");

  const emailInput = screen.getByRole("textbox", { name: /email/i })
  userEvent.type(emailInput, "notvalidemail");

  const button = screen.getByRole("button", { name: /Sign In/i })
  userEvent.click(button);

  //Assert
  // expect the error text to be displayed
  const errorMessage = screen.queryByText(/Sorry something went wrong/i)
  console.log(errorMessage);
  expect(errorMessage).toBeInTheDocument();

  // expect the success text not to be displayed 
  const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i)
  console.log(successMessage);
  expect(successMessage).not.toBeInTheDocument();

})

// Test 5 => Ensuring the form has valid inputs & giving the success message as per Form.jsx

it("should submit the form with valid fields", () => {
  //Arrange
  render (<Form/>)

  //Act
  const nameInput = screen.getByRole("textbox", { name: /name/i})
  userEvent.type(nameInput, "as");

  const emailInput = screen.getByRole("textbox", { name: /email/i })
  userEvent.type(emailInput, "notvalid@email");

  const button = screen.getByRole("button", { name: /Sign In/i })
  userEvent.click(button);

  //Assert
  // expect the error text not to be displayed
  const errorMessage = screen.queryByText(/Sorry something went wrong/i)
  console.log(errorMessage);
  expect(errorMessage).not.toBeInTheDocument();

  // expect the success text to be displayed 
  const successMessage = screen.queryByText(/Thank you for submitting! We'll be in touch/i)
  console.log(successMessage);
  expect(successMessage).toBeInTheDocument();

})