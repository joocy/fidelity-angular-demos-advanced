// Component integration test — tests behaviour through the DOM, not implementation details
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FundCard } from './fund-card';
import { Fund } from './fund.model';

const mockFund: Fund = {
  id: 'F001',
  name: 'Apex Growth Fund',
  ytd: 12.45,
  riskRating: 'Medium',
};

const mockFundNegative: Fund = {
  id: 'F002',
  name: 'Apex Bond Fund',
  ytd: -3.12,
  riskRating: 'Low',
};

function query(fixture: ComponentFixture<FundCard>, testId: string): HTMLElement {
  return fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
}

describe('FundCard', () => {
  let fixture: ComponentFixture<FundCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCard],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FundCard);
    fixture.componentRef.setInput('fund', mockFund);
    fixture.detectChanges();
  });

  it('renders the fund name', () => {
    const el = query(fixture, 'fund-name');
    expect(el.textContent?.trim()).toBe('Apex Growth Fund');
  });

  it('shows a positive YTD return with a green badge', () => {
    const el = query(fixture, 'fund-return');
    expect(el.textContent?.trim()).toContain('+12.45%');
    expect(el.classList).toContain('badge-up');
  });

  it('shows a negative YTD return with a red badge', () => {
    fixture.componentRef.setInput('fund', mockFundNegative);
    fixture.detectChanges();

    const el = query(fixture, 'fund-return');
    expect(el.textContent?.trim()).toContain('-3.12%');
    expect(el.classList).toContain('badge-down');
  });

  it('clicking View emits the fund via the selected output', () => {
    let emitted: Fund | undefined;
    fixture.componentInstance.selected.subscribe((f: Fund) => (emitted = f));

    const btn = query(fixture, 'view-btn') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();

    expect(emitted).toEqual(mockFund);
  });

  it('displays the correct risk rating badge text', () => {
    const el = query(fixture, 'risk-rating');
    expect(el.textContent?.trim()).toBe('Medium');
  });

  it('displays the correct risk rating for a Low-risk fund', () => {
    fixture.componentRef.setInput('fund', mockFundNegative);
    fixture.detectChanges();

    const el = query(fixture, 'risk-rating');
    expect(el.textContent?.trim()).toBe('Low');
  });
});
