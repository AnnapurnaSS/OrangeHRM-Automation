import {expect} from '@playwright/test'
import path from 'path'
import fs from 'fs'
class MyInfo{
    constructor(page){
        this.page = page
        this.url = '/web/index.php/pim/viewPersonalDetails/empNumber/7'
        this.profileimg = page.getByAltText('profile picture').last()
        this.image = page.locator('[class="oxd-file-div oxd-file-div--active"]')
        this.personaldel = page.getByText('Personal Details')
        this.Nationality = page.locator('[class="oxd-select-text oxd-select-text--active"]').nth(0)
        this.MaritalStatus = page.locator('[class="oxd-select-text oxd-select-text--active"]').nth(1)
        this.BloodType = page.locator('[class="oxd-select-text oxd-select-text--active"]').nth(2)
        this.ExpiryDate = page.locator('[placeholder="yyyy-dd-mm"]').first()
        this.BirthDate = page.locator('[placeholder="yyyy-dd-mm"]').last()
        this.male =page.locator('[type="radio"][value="1"]').first()
        this.female =page.getByRole('radio',{name:'Female'})
        this.file = page.getByText('Browse')
        this.deletpop = page.getByRole('button',{name:" Yes, Delete "})
        this.down = page.locator('[class="oxd-icon bi-download"]').nth(0)
              

    }
    async myprofile(){
        await this.page.goto(this.url)
        // this.page.waitFor()
        await this.profileimg.click()
    //    await this.image.setInputFiles(path.join(__dirname, '../testdata/ai-generated-8560118_1280.jpg')

        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.image.click()
            ]);

            await fileChooser.setFiles(
                path.join(__dirname, '../testdata/ai-generated-8560118_1280.jpg')
            );
            // await this.page.pause()
        await this.personaldel.click()
        await this.Nationality.click()
        await this.page.getByText('Afghan').first().click()
        await this.MaritalStatus.click()
        await this.page.getByText('Married').first().click()
        // await page.waitForLoadState('networkidle');
        await this.female.scrollIntoViewIfNeeded();
        await this.female.click({ force: true })
        await this.BirthDate.fill('1999-06-18')
        const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.down.click()
        ]);
        await console.log(download.suggestedFilename());

        expect(download.suggestedFilename()).toBe('test.png');
        const p = await download.path();

        expect(fs.existsSync(p)).toBeTruthy();
        await this.page.pause()
               
    }

}
export default MyInfo