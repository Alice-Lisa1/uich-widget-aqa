import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  // проверка видимости кнопки открытия виджета при загрузке
  test('widget open button is visible on page load', async ({ page }) => {
    const openButton = page.locator(WidgetPage.selector.BUTTON_OPEN);
    await expect(openButton).toBeVisible();
  });

  test('opens', async ({ page }) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = page.locator(
        WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM
    );

    await expect(articles.first()).toBeVisible();

    await articles.first().click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getWidgetBody())
        .toContainText('Связь с поддержкой');
  });
});