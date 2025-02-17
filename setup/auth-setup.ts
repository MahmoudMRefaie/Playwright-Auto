import { APIRequestContext, test as setup } from '@playwright/test';

const authFile = './setup/auth-api.json';

export async function authenticateAPI(request: APIRequestContext) {         //DUMMY request to check API call
    console.log('Global API setup running...');

    const response = await request.post('https://reqres.in/api/users', {
      form: {
        name: 'morpheus',
        job: 'leader'
      },
    });

    const responseBody = await response.json();
    console.log(responseBody)
    console.log(responseBody.createdAt)
    console.log(await response.status())
  
    // Save the storage state
    await request.storageState({ path: authFile });
}