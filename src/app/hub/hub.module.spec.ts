import { HubModule } from './hub.module';

describe('HubModule', () => {
  let hubModule: HubModule;

  beforeEach(() => {
    hubModule = new HubModule();
  });

  it('should create an instance', () => {
    expect(hubModule).toBeTruthy();
  });
});
