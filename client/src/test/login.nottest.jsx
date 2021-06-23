// __tests__/fetch.test.js
import React from 'react'
import { render, fireEvent, act, wrapper} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import Enzyme, { shallow, mount } from "enzyme";
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/authentication/loginForm'
configure({adapter: new Adapter()});

describe("login form", () => {
    const { getByTestId } = render(<Router><Login /></Router>);
    const password = getByTestId("password") 
    const email = getByTestId("email");
    const submit = getByTestId("button");
    console.log(submit);

    it("kijkt of velden leeg beginnen", () => {
      expect(password.value).toBe("");
      expect(email.value).toBe("");
    });

    it("kijkt wat gebeurt bij foute inputs", () => {
        fireEvent.change(email, { target: { field: "" } });
        fireEvent.change(password, { target: { field: "test1" } });
        fireEvent.click(submit);
        expect(email.helperText).toEqual("Verplicht");
    });
});