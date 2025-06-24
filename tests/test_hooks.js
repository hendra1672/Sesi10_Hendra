
    const { Builder, By, until } = require('selenium-webdriver');
    const assert = require('assert');
    const chrome = require('selenium-webdriver/chrome');
	describe('Google Search Test', function () {
    let driver;
        
    //Terlebih dahulu beforeEach dijalankan sebelum menjalankan test case (setiap test case)
    beforeEach(async function () {
    console.log('Ini beforeEach() hook: Membuka URL');
    const options = new chrome.Options();
    options.addArguments('--incognito'); 
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    await driver.get('https://www.saucedemo.com');
    });

    //Terlebih dahulu test case dijalankan sebelum afterEach dijalankan (setiap test case)
    afterEach(async function () {       
    console.log('Ini afterEach() hook: Menutup driver');
    await driver.sleep(750);       
    await driver.quit();
    });
          
        it('Test Case 1 - Web Address', async function () {
        const title = await driver.getTitle();
        assert.strictEqual(title,'Swag Labs');
        })

        it('Test Case 2 - Login Negative Test Case', async function () {
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action')) 
        await inputUsername.sendKeys('standard_us')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
            let errorMessageElement = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 2000);
            let actualErrorMessage = await errorMessageElement.getText();
            assert.strictEqual(actualErrorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Pesan error tidak sesuai');  
        })

        it('Test Case 3 - Login Positive Test Case', async function () {
        let inputUsername = await driver.findElement(By.css('[data-test="username"]')) 
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
        await driver.wait(until.urlContains('/inventory.html'), 2000, 'Login failed: did not redirect to inventory page within 2 seconds.');
            let pageTitle = await driver.getTitle();
            assert.strictEqual(pageTitle, 'Swag Labs', 'Page title should be "Swag Labs" after successful login.');
            console.log('Login berhasil dan halaman "Swag Labs" terbuka.');
        })

        it('Test Case 4 - Sort Product Z - A', async function () {      
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()
            await driver.wait(until.urlContains('/inventory.html'), 2000, 'Login failed within 2 seconds.');
            let pageTitle = await driver.getTitle();
            assert.strictEqual(pageTitle, 'Swag Labs', 'Page title "Swag Labs" after successful login.');
            console.log('Login berhasil');
                const optionZa = await driver.findElement(By.xpath("//select[@class='product_sort_container']/option[@value='za']"));
                await optionZa.click();
                let product_sort_container = await driver.findElement(By.xpath('//div[normalize-space()="Test.allTheThings() T-Shirt (Red)"]'));
                    let isProductDisplayed = await product_sort_container.isDisplayed();
                    assert.strictEqual(isProductDisplayed, true, 'The "Test.allTheThings() T-Shirt (Red)" product should be displayed.');
                    console.log('Berhasil sort produk "Name (Z to A)".');
        });   
    })