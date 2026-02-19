
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Go to the homepage
        await page.goto("http://localhost:3000")

        # Wait for the H1 to be visible
        h1 = page.locator("h1")
        await h1.wait_for()

        # Check if H1 text is correct
        text = await h1.text_content()
        print(f"H1 Text: {text}")

        if "Travel Umroh & Haji Terpercaya" in text:
             print("SUCCESS: H1 text updated correctly.")
        else:
             print(f"FAILURE: Expected 'Travel Umroh & Haji Terpercaya', found '{text}'")

        # Take a screenshot
        await page.screenshot(path="verification/seo_h1_verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
