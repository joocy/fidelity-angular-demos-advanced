import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FundService } from './fund.service';
import { Fund } from './fund.model';

const MOCK_FUNDS: Fund[] = [
  { id: 'F001', name: 'Apex Growth Fund',  ytd: 12.45, riskRating: 'Medium' },
  { id: 'F002', name: 'Apex Bond Fund',    ytd: -3.12, riskRating: 'Low' },
  { id: 'F003', name: 'Apex Global Equity', ytd: 7.88, riskRating: 'High' },
];

describe('FundService', () => {
  let service: FundService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(FundService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify there are no outstanding (unexpected) HTTP requests after each test
    httpTesting.verify();
  });

  it('getFunds() makes a GET request to /api/funds and returns parsed data', () => {
    let result: Fund[] | undefined;

    service.getFunds().subscribe((funds) => (result = funds));

    const req = httpTesting.expectOne('/api/funds');
    expect(req.request.method).toBe('GET');

    req.flush(MOCK_FUNDS);

    expect(result).toEqual(MOCK_FUNDS);
    expect(result?.length).toBe(3);
  });

  it('getFund(id) makes a GET request to /api/funds/:id', () => {
    const expected = MOCK_FUNDS[0];
    let result: Fund | undefined;

    service.getFund('F001').subscribe((fund) => (result = fund));

    const req = httpTesting.expectOne('/api/funds/F001');
    expect(req.request.method).toBe('GET');

    req.flush(expected);

    expect(result).toEqual(expected);
    expect(result?.name).toBe('Apex Growth Fund');
  });

  it('getFund(id) constructs the URL correctly for any given id', () => {
    service.getFund('F003').subscribe();

    const req = httpTesting.expectOne('/api/funds/F003');
    expect(req.request.url).toBe('/api/funds/F003');
    req.flush(MOCK_FUNDS[2]);
  });
});
