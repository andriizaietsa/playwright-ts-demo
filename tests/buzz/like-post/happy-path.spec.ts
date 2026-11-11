/**
 * Buzz — Like post › Happy path
 *
 * A user likes a fresh post; its counter goes from 0 to 1 like.
 *
 * Seeding: one post via the API, so it starts with zero likes.
 * Cleanup: the post, after the test.
 */
import { test, expect } from '../../../fixtures/buzz.fixture';

test.describe('Buzz — Like post › Happy path', { tag: '@smoke' }, () => {
  test('Like a post — counter shows 1 Like', async ({ seed, buzzPage }) => {
    const post = await seed.buzzPost();
    const card = buzzPage.postCard(post.text);

    await test.step('Open the newsfeed', async () => {
      await buzzPage.goto();
      // Gate: a fresh post starts with no likes; otherwise the click below proves nothing.
      await expect(buzzPage.likesCount(card)).toHaveText('0 Likes');
    });

    await test.step('Like the post', async () => {
      await buzzPage.likeButton(card).click();
    });

    await test.step('Verify the counter shows 1 Like', async () => {
      await expect.soft(buzzPage.likesCount(card)).toHaveText('1 Like');
    });
  });
});
