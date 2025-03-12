import {expect, Page} from "@playwright/test";
import Navigation from "./Navigation";
import * as nodeFetch from 'node-fetch'


export default class LoginPage {
    constructor(page) {
        this.page = page;
        this.moveToSignUpBtn = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')

    }


    async moveToSignUp() {
        await this.moveToSignUpBtn.waitFor()
        await this.moveToSignUpBtn.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
    }

}

export const getLoginToken = async () => {
    const request = await nodeFetch('http://localhost:2222/api/login', {
        method: 'POST',
        body: JSON.stringify({"username": "admin", "password": "Admin123"})
    })
    if (request.status !== 200) {
        throw new Error('Unable to retrieve login token')
    }
    const response = await request.json()
    return response.token
}

