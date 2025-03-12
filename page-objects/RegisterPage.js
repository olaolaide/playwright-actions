import {expect, Page} from "@playwright/test";
import Navigation from "./Navigation";


export default class RegisterPage {
    constructor(page) {
        this.page = page;
        this.addBtn = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')

    }


}

