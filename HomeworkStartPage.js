exports.HomeworkStartPage = class HomeworkStartPage {
    constructor(page){
        this.page = page;
    }

    async goto(buildNumber) {
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
        await this.page.selectOption('select#selectBuild', buildNumber);
    }
    async simpleCalculation(number1, number2, selection) {
        await this.page.fill('#number1Field', number1);
        await this.page.fill('#number2Field', number2);
        await this.page.selectOption('select#selectOperationDropdown', selection);
        await this.page.click('#calculateButton');
    }

}

