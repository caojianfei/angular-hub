import { BootstrapModule } from './bootstrap.module';

describe('BootstrapModule', () => {
  let bootstrapModule: BootstrapModule;

  beforeEach(() => {
    bootstrapModule = new BootstrapModule();
  });

  it('should create an instance', () => {
    expect(bootstrapModule).toBeTruthy();
  });
});
