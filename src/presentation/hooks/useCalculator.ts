import {useRef, useState} from 'react';

enum Operator {
  add,
  substract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [previusNumber, setPreviusNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') {
      return;
    }
    if (number.startsWith('0') || number.startsWith('-0')) {
      //Punto Decimal
      if (numberString === '.') {
        return setNumber(`${number}${numberString}`);
      }
      //Es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(`${number}${numberString}`);
      }
      //Es diferente de cero, no hay punto y es el primer número
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      //Evitar 00000.000
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      return setNumber(`${number}${numberString}`);
    }
    setNumber(`${number}${numberString}`);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPreviusNumber(number.slice(0, 1));
    } else {
      setPreviusNumber(number);
    }
    setNumber('0');
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };
  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  };
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };
  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };
  const resetNumber = () => {
    setNumber('0');
    setPreviusNumber('0');
  };
  const deleteLast = () => {
    if (number.length === 2 && number.includes('-')) {
      return setNumber('0');
    }
    if (number.length === 1) {
      return setNumber('0');
    } else {
      return setNumber(number.slice(0, -1));
    }
  };
  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(previusNumber);
    switch (lastOperation.current) {
      case Operator.add:
        setNumber(`${num1 + num2}`);
        break;
      case Operator.substract:
        setNumber(`${num2 - num1}`);
        break;
      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;
      default:
        throw new Error('Operación no permitida');
    }
    setPreviusNumber('0');
  };

  return {
    // Properties
    number,
    previusNumber,
    // Methods
    buildNumber,
    resetNumber,
    deleteLast,
    toggleSign,
    addOperation,
    substractOperation,
    multiplyOperation,
    divideOperation,
    calculateResult,
  };
};
