import {ComponentFixture, TestBed} from '@angular/core/testing';
import {getTranslocoModule} from '../../transloco-root.module';
import {NoGroupComponent} from './no-group.component';

describe('NoGroupComponent', () => {
  let component: NoGroupComponent;
  let fixture: ComponentFixture<NoGroupComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoGroupComponent],
      imports: [getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
