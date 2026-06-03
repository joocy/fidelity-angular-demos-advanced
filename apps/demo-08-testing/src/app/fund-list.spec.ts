import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { FundList } from './fund-list';
import { Fund } from './fund.model';

const MOCK_FUNDS: Fund[] = [
  { id: 'F001', name: 'Apex Growth Fund',   ytd: 12.45, riskRating: 'Medium' },
  { id: 'F002', name: 'Apex Bond Fund',     ytd: -3.12, riskRating: 'Low' },
  { id: 'F003', name: 'Apex Global Equity', ytd: 7.88,  riskRating: 'High' },
];

describe('FundList', () => {
  let fixture: ComponentFixture<FundList>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundList],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FundList);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('shows a loading indicator before the HTTP response arrives', () => {
    fixture.detectChanges(); // triggers ngOnInit → HTTP call is in-flight

    const loading = fixture.nativeElement.querySelector('[data-testid="loading-indicator"]');
    expect(loading).not.toBeNull();
    expect(loading.textContent?.trim()).toContain('Loading funds');

    // Clean up the in-flight request so verify() passes
    httpTesting.expectOne('/api/funds').flush([]);
  });

  it('hides the loading indicator after the response arrives', () => {
    fixture.detectChanges();

    httpTesting.expectOne('/api/funds').flush(MOCK_FUNDS);
    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('[data-testid="loading-indicator"]');
    expect(loading).toBeNull();
  });

  it('renders one fund-card element per fund after the HTTP response', () => {
    fixture.detectChanges();

    httpTesting.expectOne('/api/funds').flush(MOCK_FUNDS);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('app-fund-card');
    expect(cards.length).toBe(MOCK_FUNDS.length);
  });

  it('shows the fund list container after funds load', () => {
    fixture.detectChanges();

    httpTesting.expectOne('/api/funds').flush(MOCK_FUNDS);
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('[data-testid="fund-list"]');
    expect(list).not.toBeNull();
  });

  it('shows an empty-state message when the API returns zero funds', () => {
    fixture.detectChanges();

    httpTesting.expectOne('/api/funds').flush([]);
    fixture.detectChanges();

    const empty = fixture.nativeElement.querySelector('[data-testid="fund-list"] p');
    expect(empty?.textContent?.trim()).toContain('No funds found');
  });
});
