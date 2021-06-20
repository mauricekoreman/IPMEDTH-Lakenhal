// __tests__/fetch.test.js
import React from 'react'
import { render, } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from '../components/authentication/loginForm'

describe("Login render Page", () => {
    it('renders the Login page', () => {
      const {getByText} = render(<Login/>);
      expect(getByText(/login/i)).toBeInTheDocument();
    });
  
    it('render 2 input components', () => {
      const {getByLabelText} = render(<Login/>);
      expect(getByLabelText(/username/i)).toBeInTheDocument();
      expect(getByLabelText(/password/i)).toBeInTheDocument();
    });
  
    it('renders a submit button', () => {
      const {getByText} = render(<Login/>);
      expect(getByText("Submit")).toBeInTheDocument();
    });
});