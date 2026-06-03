# Apex Asset Management — Advanced Angular Demos

Demo applications for the Angular Advanced course.
Each app demonstrates key concepts from its module.

## Setup
```bash
# npm
npm install

# pnpm
pnpm install
```

## Running a demo
```bash
# npm
npx nx serve demo-01-cd

# pnpm
pnpm nx serve demo-01-cd
```

| App | Port | Key concepts demonstrated |
|-----|------|--------------------------|
| demo-01-cd           | 4501 | Zoneless CD, ChangeDetectorRef.detach(), markForCheck() |
| demo-02-di           | 4502 | Multi-providers, plugin architecture, InjectionToken |
| demo-03-signals      | 4503 | Computed, effects with cleanup, toSignal/toObservable, NgRx SignalStore |
| demo-04-architecture | 4504 | Feature-based structure, domain-driven design, barrel exports |
| demo-05-routing      | 4505 | Custom preloading strategy, route resolvers, nested child routes |
| demo-06-performance  | 4506 | @defer triggers, NgOptimizedImage, lazy loading strategies |
| demo-07-forms        | 4507 | Dynamic form engine, ControlValueAccessor, cross-field validation |
| demo-08-testing      | 4508 | HttpTestingController, component harnesses, Playwright E2E |
