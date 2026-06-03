import { Component } from '@angular/core';

interface NewsItem {
  headline: string;
  source: string;
  timestamp: string;
  tag: string;
  tagType: 'up' | 'down' | 'neutral';
}

const NEWS: NewsItem[] = [
  {
    headline: 'Bank of England holds rates steady at 5.25% amid cooling inflation signals',
    source: 'Financial Times',
    timestamp: '2 hours ago',
    tag: 'Bonds +0.4%',
    tagType: 'up',
  },
  {
    headline: 'FTSE 100 closes at six-month high as energy and mining stocks rally strongly',
    source: 'Reuters',
    timestamp: '4 hours ago',
    tag: 'Equities +1.2%',
    tagType: 'up',
  },
  {
    headline: 'Sterling weakens against dollar after weaker-than-expected retail sales data',
    source: 'Bloomberg',
    timestamp: '5 hours ago',
    tag: 'FX −0.6%',
    tagType: 'down',
  },
  {
    headline: 'Global credit spreads widen as US regional bank concerns resurface in Q2',
    source: 'Wall Street Journal',
    timestamp: '7 hours ago',
    tag: 'Credit −0.3%',
    tagType: 'down',
  },
  {
    headline: 'ESG fund flows hit record £12bn in Q1 as institutional demand accelerates',
    source: 'Morningstar',
    timestamp: '9 hours ago',
    tag: 'ESG',
    tagType: 'neutral',
  },
];

@Component({
  selector: 'app-news-feed',
  template: `
    <div class="card">
      <h2>Market News Feed</h2>
      <p style="color:#6b7280;font-size:0.85rem;margin-bottom:0.75rem">
        Loaded on interaction via <code>@defer (on interaction(trigger))</code>.
        You clicked the button — now the news is here.
      </p>
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        @for (item of news; track item.headline) {
          <div style="border-left:3px solid #1a3a6b;padding:0.75rem 1rem;background:#f8fafc;border-radius:0 6px 6px 0">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;margin-bottom:0.3rem">
              <p style="margin:0;font-weight:500;line-height:1.4">{{ item.headline }}</p>
              <span class="badge"
                    [class.badge-up]="item.tagType === 'up'"
                    [class.badge-down]="item.tagType === 'down'"
                    [style.background]="item.tagType === 'neutral' ? '#e2e8f0' : ''"
                    [style.color]="item.tagType === 'neutral' ? '#1a1f35' : ''"
                    style="white-space:nowrap;flex-shrink:0">
                {{ item.tag }}
              </span>
            </div>
            <div style="font-size:0.8rem;color:#6b7280">
              <strong>{{ item.source }}</strong> · {{ item.timestamp }}
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class NewsFeed {
  readonly news = NEWS;

  constructor() {
    console.log('NewsFeed initialised');
  }
}
