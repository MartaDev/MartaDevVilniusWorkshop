const { test, expect } = require('@playwright/test');
const { HomeworkStartPage } = require('../homework-pages/homework-start-page');

const buildSelector = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
buildSelector.forEach(calculatorBuild => {
  test.describe('', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();
      startPage = new HomeworkStartPage(page);
    });

    test.beforeEach(async () => {
      await startPage.goto(calculatorBuild);
    });

    test.only(`Testing if calculator build ${calculatorBuild} is loading with all fields`, async () => {
      const formFields = ['#calcForm', '#number1Field', '#number2Field', '#selectOperationDropdown',
        '#calculateButton', '#numberAnswerField', '#integerSelect', '#clearButton'];
      for (let i = 0; i < formFields.length; i++) {
        const calculatorForm = await page.isVisible(formFields[i]);
        expect(calculatorForm).toBe(true);
      }
    });

    test.only(`Testing calculator build ${calculatorBuild} simple calculations`, async () => {
      let num1 = Math.floor(Math.random() * 50) + 1;
      let num2 = Math.floor(Math.random() * 50) + 1;
      for (let i = 0; i < 5; i++) {
        await startPage.simpleCalculation(num1.toString(), num2.toString(), i.toString());
        let expectedValue = num1 + num2;
        const answerFieldResults = await page.inputValue('#numberAnswerField');
        switch (i.toString()) {
          case '1':
            expectedValue = num1 - num2;
            break;
          case '2':
            expectedValue = num1 * num2;
            break;
          case '3':
            expectedValue = num1 / num2;
            break;
          case '4':
            expectedValue = num1.toString() + num2.toString();
        }
        expect(answerFieldResults).toBe(expectedValue.toString());
      }
    });

    test.only(`Testing calculator build ${calculatorBuild} division by 0`, async () => {
      let num = Math.floor(Math.random() * 50) + 1;
      await startPage.simpleCalculation(num.toString(), '0', '3');
      const errorMessage = await page.isVisible('#errorMsgField');
      expect(errorMessage).toBe(true);
    });

    test.only(`Testing if integer checkmark works in calculator build ${calculatorBuild}`, async () => {
      const isCheckmarkWorking = await page.isEnabled("#integerSelect");
      expect(isCheckmarkWorking).toBe(true);
      if (!isCheckmarkWorking) { return; }
      await startPage.simpleCalculation('10', '3', '3');
      await page.click('#integerSelect');
      const answerFieldResults = await page.inputValue('#numberAnswerField');
      const expectedValue = Math.trunc(10 / 3);
      expect(answerFieldResults).toBe(expectedValue.toString());
    });

    
    });

  });
