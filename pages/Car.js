const fs = require('fs');
 
export class Car {
    constructor(page) {
        this.page = page;
 
        // Locator
        this.priceLocator = this.page.locator(".rupee_icon + span");
    }
 
    async storeCarInsurance() {
        try {
            const prices = await this.priceLocator.allTextContents();
            let result = [];
 
            for (let i = 0; i < prices.length; i += 2) {
                if (prices[i] && prices[i + 1]) {
                    result.push({ "IDV": prices[i], "Price": prices[i + 1] });
                }
            }
 
            fs.writeFileSync("utils/Car_result.json", JSON.stringify(result, null, 2));
        } 
        catch (error) {
            console.error("Error storing car insurance data:", error);
        }
    }
}