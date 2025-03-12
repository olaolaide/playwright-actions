import {expect} from "@playwright/test";

export default class Navigation {
    constructor(page) {
        this.page = page;
        this.basketCount = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', {name: 'Checkout'});
    }

    async getBasketCount() {
        await this.basketCount.waitFor()
        const total = await this.basketCount.innerText()
        return parseInt(total, 10)
    }

    async gotoToCheckout() {
        await this.checkOutLink.waitFor();
        await this.checkOutLink.click();
        await this.page.waitForURL('/basket');
        expect(this.page.url()).toContain('/basket');
    }

}