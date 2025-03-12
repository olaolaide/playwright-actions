import {expect, Page} from "@playwright/test";
import Navigation from "./Navigation";


export default class ProductPage {
    constructor(page) {
        this.page = page;
        this.addBtn = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')

    }

    async visit() {
        await this.page.goto('/');
    }

    async addItemToBasket(index) {
        const specificAddBtn = this.addBtn.nth(index)
        await specificAddBtn.waitFor()
        await expect(specificAddBtn).toHaveText('Add to Basket');
        const navigation = new Navigation(this.page);
        const basketCountBeforeCounting = await navigation.getBasketCount()
        await specificAddBtn.click()
        await expect(specificAddBtn).toHaveText('Remove from Basket');
        const basketCountAfterCounting = await navigation.getBasketCount()
        await expect(basketCountAfterCounting).toBeGreaterThan(basketCountBeforeCounting)
    }

    async sortProductsByCheapest() {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productsTitleBeforeSorting = await this.productTitle.allTextContents()
        await this.sortDropdown.selectOption('price-asc')
        const productsTitleAfterSorting = await this.productTitle.allTextContents()
        expect(productsTitleAfterSorting).not.toEqual(productsTitleBeforeSorting)
        await this.page.pause()
    }
}

