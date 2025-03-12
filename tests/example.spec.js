// @ts-check
import {test} from '@playwright/test';
import ProductPage from "../page-objects/ProductPage";
import Navigation from "../page-objects/Navigation";
import CheckOutPage from "../page-objects/CheckOutPage";
import LoginPage from "../page-objects/LoginPage";


test('Ecommerce Store', async ({page}) => {
    const productPage = new ProductPage(page);
    await productPage.visit();

    await productPage.sortProductsByCheapest()
    await productPage.addItemToBasket(0)
    await productPage.addItemToBasket(1)
    await productPage.addItemToBasket(2)

    // await productPage.sortProductsByCheapest()
    const navigation = new Navigation(page);
    await navigation.gotoToCheckout();

    const checkoutPage = new CheckOutPage(page);
    await checkoutPage.removeCheapestProduct()
    await checkoutPage.checkOut()

    const login = new LoginPage(page);
    await login.moveToSignUp()
});