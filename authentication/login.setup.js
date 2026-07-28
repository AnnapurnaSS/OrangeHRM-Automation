import { test as setup, expect } from '@playwright/test';
import user from '../testdata/user.json'

setup('Login',async({page})=>{
    console.log("LOGIN SETUP STARTED");
    // Open login page
    await page.goto('/web/index.php/auth/login');
     // Enter credentials
    await page.locator('[placeholder="Username"]').fill(user.username);
    await page.locator('[placeholder="Password"]').fill(user.password);
    // Click login
    await page.getByRole('button',{name:' Login '}).click();
    // Verify login
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
    // Save session
    await page.context().storageState({path:'authentication/storageState.json'});

})