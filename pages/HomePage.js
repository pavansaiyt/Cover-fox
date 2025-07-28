export class HomePage {
    constructor(page) {
        this.page = page;
 
        // Locators
        this.categoryLocator = this.page.locator(".widget-nav.will-fade.fade-appear li");
        this.viewQuotesLocator = this.page.getByTitle("View Quotes");
        this.radioOptionLocator = this.page.locator(".w--radio__option");
        this.phoneInputLocator = this.page.locator("input[type='tel']");
        this.vehicleInputLocator = this.page.locator("input[type='text']");
    }
 
    async gotoWebsite() {
        try {
            await this.page.goto("https://www.coverfox.com/");
        } 
        catch (error) {
            console.error("Error navigating to website:", error);
        }
    }
 
    async selectCategory(type) {
        try {
            await this.categoryLocator.filter({ hasText: type }).click();
        } 
        catch (error) {
            console.error(`Error selecting category "${type}":`, error);
        }
    }
 
    async clickViewQuotes(order) {
        try {
            if (order === 'first') {
                await this.viewQuotesLocator.click();
            } else {
                await this.viewQuotesLocator.last().click();
            }
        } 
        catch (error) {
            console.error(`Error clicking 'View Quotes' button (${order}):`, error);
        }
    }
 
    async selectOption1(text) {
        try {
            const option = this.radioOptionLocator.filter({ hasText: text }).first();
            await option.waitFor();
            await option.click();
        } 
        catch (error) {
            console.error(`Error selecting radio option "${text}":`, error);
        }
    }
 
    async fillNumber(num) {
        try {
            await this.phoneInputLocator.fill(num);
        } 
        catch (error) {
            console.error("Error filling phone number:", error);
        }
    }
 
    async fillVehicleNumber(number) {
        try {
            await this.vehicleInputLocator.fill(number);
        } 
        catch (error) {
            console.error("Error filling vehicle number:", error);
        }
    }
}