from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:8080")
    page.wait_for_timeout(500)

    # Note: Language is Thai by default, wait, I can just click the second one
    # Or click by text if I don't know the exact role/name.
    # Actually, in home-view.tsx:
    # "trackingOn" is "Start Tracking" or similar in English.
    # In index.html it has <html lang="th" ...
    # So I will use the class names or simpler text.

    # Try finding the start button directly by clicking something that looks like it.
    # Or just use the DOM structure.

    # Click tracking ON if not already on
    page.locator('button[role="radio"]').nth(0).click()
    page.wait_for_timeout(500)

    # Click "Start Today" / "Start Eating" / etc.
    # PrimaryButton usually has btn-fast or btn-eat class.
    # Let's just click all PrimaryButton-like elements until "Cancel eating" appears.
    for btn in page.locator('button.btn-fast').all():
        btn.click()
        page.wait_for_timeout(500)

    for btn in page.locator('button.btn-eat').all():
        # But wait, stopEating is a btn-eat button. We want to start eating.
        # But before that, we just want to get to the "eating" state.
        pass

    # Actually, "Start Today" is PrimaryButton -> btn-fast.
    # After that, it says "Start Eating", which is also btn-fast.
    for _ in range(2):
        try:
            page.locator('button.btn-fast').click()
            page.wait_for_timeout(500)
        except:
            pass

    # Take screenshot at the key moment showing "Cancel Eating" with the X icon
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
