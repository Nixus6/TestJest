import React from 'react';
import App from './App';
import AccountBalance from "./components/AccountBalance";
import Notification from "./components/Notification";
import {shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

const userBalance = {
  balance: 1100,
  savingBalance: 103,
}

describe("Renderizando Componentes", () => {
  it("Renderiza el Componente App Sin Fallar", () => {
    shallow(<App />);
  });

  it("Renderizando el Componente Header Sin Fallar", () => {
    const APP = shallow(<App />);
    const header = (<h1 className="has-text-centered title is-1">Welcome in the personal finance app!</h1>);
    expect(APP.contains(header)).toEqual(true);
  });

  it("Renderizando el Componente Notification sin Fallar", () => {
    shallow(<Notification />);
  });

  it("Renderizando el Boton", () => {
    const Button = mount(<AccountBalance accounts={userBalance} />);
    const label = Button.find("#balance-button").text();
    expect(label).toEqual("Send 100$");
  })

})

describe("Pasando props", () => {
  const accountWrapper = mount(<AccountBalance accounts={userBalance} />);
  const notificationWrapper = mount(<Notification balance={userBalance.balance} />);

  it("Acepta los props de la cuenta de usuario", () => {
    expect(accountWrapper.props().accounts).toEqual(userBalance);
  })
  it("Contiene los valores a guardar del savingBalance", () => {
    const value = accountWrapper.find(".savings").text();
    const expectedValue = userBalance.savingBalance + '$';
    expect(value).toEqual(expectedValue);
  })
  it("Notificación Acepto los Props", () => {
    expect(notificationWrapper.props().balance).toEqual(userBalance.balance);
  })
})

describe("logica", () => {
  const accountWrapper = mount(<AccountBalance accounts={userBalance} />);
  const notificationWrapper = mount(<Notification balance={userBalance.balance} />);
  accountWrapper.find('#balance-button').simulate("click");

  it("Click - Actualizar Ahorros", () => {
    const Ahorros = accountWrapper.find(".savings").text();
    const expectedAhorrosValue = userBalance.savingBalance + 100 + '$';
    expect(Ahorros).toEqual(expectedAhorrosValue);
  })
  it("Click - Actualizar Balance ", () => {
    const Balance = accountWrapper.find(".balance").text();
    const expectedBalanceValue = userBalance.balance - 100 + '$';
    expect(Balance).toEqual(expectedBalanceValue);
  })

})

describe("snapshots", () => {
  it("App Snapshots", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  })
  it("Accounts Snapshot", () => {
    const accountBAlanceTree = shallow(<AccountBalance accounts={userBalance} />);
    expect(toJson(accountBAlanceTree)).toMatchSnapshot();
  })
  it("Notification Snapshot", () => {
    const notificationTree = shallow(<Notification accounts={userBalance.balance} />);
    expect(toJson(notificationTree)).toMatchSnapshot();
  })
})