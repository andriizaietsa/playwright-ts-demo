import { expect, type Locator, type Page, type Request } from '@playwright/test';
import { BasePage } from '../BasePage';

const FEED_ENDPOINT = '/api/v2/buzz/feed';

/** Buzz — /web/index.php/buzz/viewBuzz: the company newsfeed. */
export class BuzzPage extends BasePage {
  readonly path = '/web/index.php/buzz/viewBuzz';
  readonly postInput: Locator;
  readonly postButton: Locator;

  constructor(page: Page) {
    super(page);
    this.postInput = this.content.getByPlaceholder("What's on your mind?");
    this.postButton = this.content.getByRole('button', { name: 'Post', exact: true });
  }

  /**
   * Opens the newsfeed and waits until every feed request has finished. The page requests the feed twice
   * on load, and posting before both land can draw the new post twice (an app race: the server holds one post).
   */
  async goto(): Promise<void> {
    let pendingFeedRequests = 0;
    const isFeed = (request: Request) => request.url().includes(FEED_ENDPOINT);
    const onStart = (request: Request) => {
      if (isFeed(request)) pendingFeedRequests += 1;
    };
    const onEnd = (request: Request) => {
      if (isFeed(request)) pendingFeedRequests -= 1;
    };
    this.page.on('request', onStart);
    this.page.on('requestfinished', onEnd);
    this.page.on('requestfailed', onEnd);
    try {
      const firstFeed = this.page.waitForResponse((response) => response.url().includes(FEED_ENDPOINT));
      await super.goto();
      await firstFeed;
      await expect.poll(() => pendingFeedRequests, { message: 'Buzz feed is still loading' }).toBe(0);
    } finally {
      this.page.off('request', onStart);
      this.page.off('requestfinished', onEnd);
      this.page.off('requestfailed', onEnd);
    }
  }

  /** The feed card of the post with exactly this text. Cards have no role, hence the class. */
  postCard(text: string): Locator {
    return this.content.locator('.orangehrm-buzz').filter({ has: this.page.getByText(text, { exact: true }) });
  }

  likeButton(card: Locator): Locator {
    // The heart is an SVG without an accessible name or button role.
    return card.locator('.orangehrm-heart-icon');
  }

  /** "0 Likes" / "1 Like" counter of a card. */
  likesCount(card: Locator): Locator {
    return card.getByText(/^\d+ Likes?$/);
  }
}
