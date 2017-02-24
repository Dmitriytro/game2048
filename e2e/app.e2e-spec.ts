import { Game2048Page } from './app.po';

describe('game2048 App', function() {
  let page: Game2048Page;

  beforeEach(() => {
    page = new Game2048Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
