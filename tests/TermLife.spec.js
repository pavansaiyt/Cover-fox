import { test, expect } from '@playwright/test';
const fs = require('fs');
const { HomePage } = require('../pages/HomePage');
const { TermLife } = require('../pages/TermLife');

const inputdata = require('../utils/input.json')

test.describe('Term Life Insurance', () => {
    let page;
    let homePage;
    let termLife;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        termLife = new TermLife(page);
    });

    test("Term Life Page", async () => {
        // Go to the https://www.coverfox.com/
        await homePage.gotoWebsite();
        // Select the Term Life category
        await homePage.selectCategory(inputdata.TermLife);
        // Select the gender option
        await homePage.selectOption1(inputdata.Gender);
        // Select the age
        await termLife.selectAge();
        // Enter the name
        await termLife.fillName();
        // Enter the phone number
        await homePage.fillNumber(inputdata.PhoneNumber);
        // Click the View Quotes button (first)
        await homePage.clickViewQuotes("first");
        // Wait for the selector
        await page.waitForSelector(".refine-popup");
    });

    test("Select Details", async () => {
        // Select the details
        await termLife.selectDetials();
        // Select the salary
        await termLife.selectSalary();
    });

    test("Select Education", async () => {
        // Select the education
        await termLife.selectEducation();
        // Click the See Quotes button
        await termLife.selectButton("See Quotes");
        // Click the Confirm button
        await termLife.selectButton("Confirm");
        // Wait for the header title
        await page.waitForSelector(".header-title");
    });

    test("Store Term Life Insurance", async () => {
        // Store the term life insurance details
        await termLife.storeTermLifeInsurance();
    });
});