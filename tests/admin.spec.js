import { test,expect } from '../fixtures/testFixture.js';

test('AddUser',async ({adminpage,page}) => {

    await adminpage.addUser("Admin","Enabled",'suchit1','suchit123','suchit123')
    await adminpage.searchUser('suchit1','Admin')
    await adminpage.editUser('suchit1','Admin')
    
});