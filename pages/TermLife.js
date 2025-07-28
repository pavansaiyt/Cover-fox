const fs = require('fs');
 
export class TermLife {
    constructor(page) {
        this.page = page;
 
        // Common locators
        this.genderLocator = this.page.locator("//div[@class='w--radio__option ']");
        this.ageArrowLocator = this.page.locator(".w--multi_select_arrow");
        this.ageOptionLocator = this.page.locator("//span[@class='w--multi_select_dd_element   ']").filter({ hasText: "23 years" });
        this.nameInputLocator = this.page.locator("input[type='text']").last();
        this.detailsButtonLocator = this.page.locator("//div[@class='cf-button-radio__option  ']");
        this.detailsRadioLocator = this.page.locator("//div[@class='cf-radio__option  ']");
        this.salaryDropdownLocator = this.page.locator(".drop-down.salary-dropdown");
        this.salaryOptionLocator = this.salaryDropdownLocator.locator(".dd__inner.reveal .dd__options .dd__option").nth(4);
        this.educationDropdownLocator = this.page.locator(".drop-down").last();
        this.educationOptionLocator = this.educationDropdownLocator.locator(".dd__inner.reveal .dd__options .dd__option").nth(2);
        this.priceLocator = this.page.locator(".price strong");
    }
 
    async selectGender() {
        try {
            await this.genderLocator.first().click();
        } 
        catch (error) {
            console.error("Error selecting gender:", error);
        }
    }
 
    async selectAge() {
        try {
            await this.ageArrowLocator.click();
            await this.ageOptionLocator.waitFor();
            await this.ageOptionLocator.click();
        } 
        catch (error) {
            console.error("Error selecting age:", error);
        }
    }
 
    async fillName() {
        try {
            await this.nameInputLocator.fill("Pavan");
        } 
        catch (error) {
            console.error("Error filling name:", error);
        }
    }
 
    async selectDetials() {
        try {
            await this.detailsButtonLocator.last().click();
            await this.detailsRadioLocator.first().click();
        } 
        catch (error) {
            console.error("Error selecting additional details:", error);
        }
    }
 
    async selectSalary() {
        try {
            await this.salaryDropdownLocator.first().click();
            await this.salaryOptionLocator.click();
        } 
        catch (error) {
            console.error("Error selecting salary:", error);
        }
    }
 
    async selectEducation() {
        try {
            await this.educationDropdownLocator.click();
            await this.educationOptionLocator.click();
        } 
        catch (error) {
            console.error("Error selecting education:", error);
        }
    }
 
    async selectButton(txt) {
        try {
            await this.page.getByText(txt).last().click();
        } 
        catch (error) {
            console.error(`Error clicking button with text "${txt}":`, error);
        }
    }
 
    async storeTermLifeInsurance() {
        try {
            const result = [];
            const price = await this.priceLocator.textContent();
            if (price) {
                result.push({ "Price": price });
                fs.writeFileSync("utils/TermLife_result.json", JSON.stringify(result, null, 2));
            } else {
                console.warn("Price data not found.");
            }
        } 
        catch (error) {
            console.error("Error storing term life insurance data:", error);
        }
    }
}
 