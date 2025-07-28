import { test, expect } from '@playwright/test';

const fs = require('fs');

const { HomePage } = require('../pages/HomePage');
const { Bike } = require('../pages/Bike');

const inputdata = require('../utils/input.json')

test.describe('Bike Insurance', () => {
    let page;
    let homePage;
    let bike;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); 
        homePage = new HomePage(page);
        bike = new Bike(page);
    });

    test("Go to the website", async () => {
        // Go to the https://www.coverfox.com/
        await homePage.gotoWebsite();
        // Select the Bike category
        await homePage.selectCategory(inputdata.Bike);
    });

    test("Fill Vehicle Number", async () => {
        // Enter the vehicle number
        await homePage.fillVehicleNumber(inputdata.BikeNumber);
    });

    test("Select Expire Status", async () => {
        // Select the second option
        await bike.selectExpireStatus();
        // Click the View Quotes button
        await homePage.clickViewQuotes("first");
        // Wait for the insurer not offered selector
        await page.waitForSelector(".insurer-not-offered");
    });

    test("Store Bike Insurance", async () => {
        // Store the bike insurance details
        await bike.storeBikeInsurance();
    });
});
