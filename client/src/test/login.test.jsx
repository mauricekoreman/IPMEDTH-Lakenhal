// __tests__/fetch.test.js
import React from 'react'
import { render, createShallow, act, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from '../components/authentication/loginForm'

describe("login form", () => {
    const { getByTestId } = render(<Login />);
    const password = getByTestId("password") 
    const email = getByTestId("email");
    
    it("renders default state", () => {
      expect(password.value).toBe("");
      expect(email.value).toBe("");
    });
});