import {test,expect} from "@playwright/test"

test('multitab',async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.locator('[href="http://www.orangehrm.com"]').click()
    ]);

    await newPage.waitForLoadState();

    await console.log(await newPage.title());
    await console.log(newPage.url());
    await newPage.close()
    await page.pause()

})