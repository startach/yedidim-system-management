import { TestBed, inject } from '@angular/core/testing';

import { YedidimApiService } from './yedidim-api.service';

describe('YedidimApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YedidimApiService]
    });
  });

  it('should be created', inject([YedidimApiService], (service: YedidimApiService) => {
    expect(service).toBeTruthy();
  }));
});
