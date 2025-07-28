import { test, expect } from '@playwright/test';
const fs = require('fs');
const { HomePage } = require('../pages/HomePage');
const { Health } = require('../pages/Health');

const inputdata = require('../utils/input.json')

test.describe('Health Insurance', () => {
    let page;
    let homePage;
    let health;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage(); 
        homePage = new HomePage(page);
        health = new Health(page);
    });

    test("Go to the website & select health category", async () => {
        // Go to the https://www.coverfox.com/
        await homePage.gotoWebsite();
 
        // Select the Health category
        await homePage.selectCategory(inputdata.Health);
 
        // Select the gender option
        await homePage.selectOption1(inputdata.Gender);
    });
 
    test("Select Relations", async () => {
        // Select the relatives
        await health.selectRelatives(inputdata.Relation2);
        await health.selectRelatives(inputdata.Relation1);
 
        // Click the next button
        await health.nextButton();
    });
 
    test("Select Age", async () => {
        // Select the age for user and relatives
        await health.ageSelection(inputdata.User, inputdata.UserAge);
        await health.ageSelection(inputdata.Relation2, inputdata.Relation2Age);
        await health.ageSelection(inputdata.Relation1, inputdata.Relation1Age);
 
        // Click the next button again
        await health.nextButton();
    });
 
    test("Enter Pin Code and Phone Number", async () => {
        // Enter the pin code and phone number
        await health.pinCode("first", inputdata.Pincode);
        await health.pinCode("second", inputdata.Pincode);
        await health.pinCode("third", inputdata.PhoneNumber);
        await health.nextButton();
        // Wait for the selector
        await page.waitForSelector(".space_p_lr_24");
    });
  
    test("Store Health Insurance", async () => {
        // Store the health insurance details
        await health.storeHealthInsurance();
    });
});
