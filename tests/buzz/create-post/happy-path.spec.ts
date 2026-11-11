/**
 * Buzz — Create post › Happy path
 *
 * A user writes a Buzz post; it is saved and shows up in the newsfeed.
 *
 * Seeding: none.
 * Cleanup: the created post, by text, after the test.
 */
import { test, expect } from '../../../fixtures/buzz.fixture';
import { uniqueName } from '../../../test-data/names';

test.describe('Buzz — Create post › Happy path', { tag: '@smoke' }, () => {
  test('Write and publish a post — shown in the newsfeed', async ({ api, cleanup, buzzPage }) => {
    const text = uniqueName('Buzz post');
    cleanup.add(`buzz post ${text}`, () => api.deleteBuzzPostsByText(text));

    await test.step('Write the post', async () => {
      await buzzPage.goto();
      await buzzPage.postInput.fill(text);
    });

    await test.step('Publish the post', async () => {
      await buzzPage.postButton.click();
    });

    await test.step('Verify the post is in the newsfeed', async () => {
      await expect.soft(buzzPage.toast.saved).toBeVisible();
      await expect.soft(buzzPage.postCard(text)).toBeVisible();
    });
  });
});
