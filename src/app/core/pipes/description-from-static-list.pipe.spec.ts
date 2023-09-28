import { DescriptionFromStaticListPipe } from './description-from-static-list.pipe';

describe('DescriptionFromStaticListPipe', () => {
  it('create an instance', () => {
    const pipe = new DescriptionFromStaticListPipe();
    expect(pipe).toBeTruthy();
  });
});
