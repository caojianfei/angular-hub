import { ApisModule } from './apis.module';

describe('ApisModule', () => {
  let apisModule: ApisModule;

  beforeEach(() => {
    apisModule = new ApisModule();
  });

  it('should create an instance', () => {
    expect(apisModule).toBeTruthy();
  });
});
