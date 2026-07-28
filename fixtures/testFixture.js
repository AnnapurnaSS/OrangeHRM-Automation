import { test as base, expect } from '@playwright/test';
import AdminPage from '../pages/admin.page.js';
import MyInfo from '../pages/myinfo.page.js'

export const test = base.extend({

    adminpage: async ({ page }, use) => {
        await use(new AdminPage(page));
    },
    info: async ({ page }, use) => {
        await use(new MyInfo(page));
    }

});

export { expect };