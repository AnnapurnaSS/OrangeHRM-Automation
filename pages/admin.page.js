import {expect} from '@playwright/test'
class AdminPage{
    constructor(page){
        this.page = page
        this.url = '/web/index.php/admin/viewSystemUsers'
        this.adminbutton = page.locator('[href="/web/index.php/admin/viewAdminModule"]')
        this.addadmin = page.getByRole('button',{'name':' Add '})
        this.userrole = page.locator('div[class="oxd-select-text oxd-select-text--active"]').first()
        
        this.status =  page.locator('div[class="oxd-select-text oxd-select-text--active"]').last()
        this.password = page.locator('[type="password"]').first()
        this.confirmpassword = page.locator('[type="password"]').last()
        this.empname = page.locator('[placeholder="Type for hints..."]')
        this.username = page.locator('[class="oxd-input oxd-input--active"]').nth(1)
        this.save = page.getByRole('button',{name:" Save "})
        this.searchusername = page.locator('input[class="oxd-input oxd-input--active"]').last()
        this.searchbutton = page.getByRole('button',{name:' Search '})
        this.changepassclickbox = page.locator('[class="oxd-checkbox-input oxd-checkbox-input--active --label-right oxd-checkbox-input"]')
        this.edit = page.locator('[class="oxd-icon bi-pencil-fill"]')
        this.delete = page.locator('[class="oxd-icon bi-trash"]')
        this.deletpop = page.getByRole('button',{name:" Yes, Delete "})
    }
   
    async addUser(userrole,status,username,password,confirmpassword){
        
        await this.page.goto(this.url)
        // await this.adminbutton.click()
        await this.addadmin.click()
        await this.userrole.click()
        await this.page.getByRole('option', { name: userrole }).click();
        await this.status.click()
        await this.page.getByRole('option', { name: status }).click();
        await this.empname.pressSequentially('manda user',{delay:200})
        await this.page.getByText('manda user').click()
        // await this.page.empname.click()
        await this.username.fill(username)
        await this.password.fill(password)
        await this.confirmpassword.fill(confirmpassword)
        await this.save.click()
    }

    async searchUser(username,userrole){
        await this.page.goto(this.url)
        await this.username.fill(username)
        await this.userrole.click()
        await this.page.getByRole('option', { name: userrole }).click();
        await this.searchbutton.click()
        await expect(this.page.locator('[role="table"]').filter({name:username})).toBeVisible()

    }

    async editUser(username,userrole){
        await this.searchUser(username,userrole)
        await this.edit.waitFor();
        await this.edit.click()
        await this.userrole.click()
        await this.page.getByRole('option', { name: userrole }).click();
        // await this.empname.pressSequentially('Peter Mac Anderson',{delay:200})
        // await this.page.getByText('Peter Mac Anderson').click()
        await this.username.fill(username)
        // await this.changepassclickbox.click()
        // await this.password.fill(password)
        // await this.confirmpassword.fill(confirmpassword)
        await this.save.click()

    }
    async delete(username,userrole){
        await this.searchUser(username,userrole)
        await this.delete.waitFor();
        await this.delete.click();
        await this.deletpop.click()
        
    }
}

export default AdminPage