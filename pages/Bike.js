const fs = require('fs');
 
export class Bike {
    constructor(page) {
        this.page = page;
 
        // Locators
        this.expireArrowLocator = this.page.locator(".bike_expired_dropdown__arrow").first();
        this.expireOptionLocator = this.page.locator(".bike_policy_details__item").filter({ hasText: "Not expired" });
        this.idvLocator = this.page.locator("//div[@class='bpc-container']//div[@class='bike-plan-card--idv']/span");
        this.priceLocator = this.page.locator("//div[@class='bpc-container']//div[@class='currency-wrapper']//span");
    }
 
    async selectExpireStatus() {
        try {
            await this.expireArrowLocator.click();
            await this.expireOptionLocator.click();
        } 
        catch (error) {
            console.error("Error selecting expire status:", error);
        }
    }
 
    async storeBikeInsurance() {
        try {
            var result = []
            const IDV = await this.page.locator("//div[@class='bpc-container']//div[@class='bike-plan-card--idv']/span[2]").allTextContents();
            const prices = await this.page.locator("//div[@class ='bpc-container']//div[@class='currency-wrapper']//span[2]").allTextContents();
            for (let i = 0; i < IDV.length; i++) {
                var obj = { "IDV": IDV[i], "Price": prices[i] }
                result.push(obj);
                fs.writeFileSync('utils/Bike_result.json', JSON.stringify(result, null, 2));
            }
        }
        catch (error) {
            console.error("Error storing bike insurance:", error);
        }
    }
}