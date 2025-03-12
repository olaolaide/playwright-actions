import {expect} from "@playwright/test";

export default class CheckOutPage {
    constructor(page) {
        this.page = page;
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeBtn = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]')
    }

    async removeCheapestProduct() {
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        const prices = allPriceText.map(priceText => parseInt(priceText.replace('$', ''), 10))
        const itemsBeforeRemoval = await this.basketCards.count()
        const smallestPrice = Math.min(...prices)
        const index = prices.indexOf(smallestPrice)
        await this.removeBtn.nth(index).waitFor()
        await this.removeBtn.nth(index).click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    async largestCheapestProduct() {
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        const prices = allPriceText.map(priceText => parseInt(priceText.replace('$', ''), 10))
        const largestPrice = Math.max(...prices)
        const index = prices.indexOf(largestPrice)
        await this.removeBtn.nth(index).waitFor()
        await this.removeBtn.nth(index).click()
    }

    async checkOut() {
        await this.continueToCheckoutBtn.waitFor()
        await this.continueToCheckoutBtn.click()
        await this.page.waitForURL(/\/login/)
    }
}