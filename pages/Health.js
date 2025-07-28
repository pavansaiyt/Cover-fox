const fs = require('fs');
 
export class Health {
    constructor(page) {
        this.page = page;
 
        // Common locators
        this.relativeLocator = this.page.locator(".ms-title");
        this.nextBtnLocator = this.page.locator(".next-btn");
        this.ageDropdownPrefix = "select[name="; // This gets completed in method
        this.pinInputLocator = this.page.locator("input[type='number']");
        this.providerNameLocator = this.page.locator(".pcc-detail-sec.pcc-plan-name");
        this.priceLocator = this.page.locator(".rupee-val");
    }
 
    async selectRelatives(relation) {
        try {
            await this.relativeLocator.filter({ hasText: relation }).click();
        } 
        catch (error) {
            console.error(`Error selecting relative "${relation}":`, error);
        }
    }
 
    async nextButton() {
        try {
            await this.nextBtnLocator.click();
        } 
        catch (error) {
            console.error("Error clicking next button:", error);
        }
    }
 
    async ageSelection(relation, age) {
        try {
            const selector = `${this.ageDropdownPrefix}${relation}]`;
            await this.page.locator(selector).selectOption(`${age}y`);
        } 
        catch (error) {
            console.error(`Error selecting age for ${relation}:`, error);
        }
    }
 
    async pinCode(order, pincode) {
        try {
            if (order === 'first') {
                await this.pinInputLocator.first().fill(pincode);
            } else if (order === 'second') {
                await this.pinInputLocator.nth(1).fill(pincode);
            } else {
                await this.pinInputLocator.last().fill(pincode);
            }
        } 
        catch (error) {
            console.error(`Error filling pincode (${order}):`, error);
        }
    }
 
    async storeHealthInsurance() {
        try {
            const name = await this.providerNameLocator.allTextContents();
            const prices = await this.priceLocator.allTextContents();
            let idx = 0;
            const result = [];
 
            for (let i = 0; i < name.length; i++) {
                if (prices[idx] && prices[idx + 1]) {
                    result.push({
                        "Provider Name": name[i],
                        "Sum Assured": prices[idx++],
                        "Premium": prices[idx++]
                    });
                } else {
                    console.warn(`Missing price data for provider "${name[i]}"`);
                    idx += 2;
                }
            }
 
            fs.writeFileSync("utils/Health_result.json", JSON.stringify(result, null, 2));
        } 
        catch (error) {
            console.error("Error storing health insurance data:", error);
        }
    }
}