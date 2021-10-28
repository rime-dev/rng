import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question, QuizMode} from '@rng/ui/quiz';
import {Subject} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'rng-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  public quiz: string | null = null;
  public quizMode: QuizMode = 'solution';
  public difficulty = 0;
  public tags = 'random';
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onFinalized(event: boolean): void {
    console.log(event);
  }
  onClosed(event: any) {
    this.router.navigate(['/']);
  }
  private checkQuestions(questions: Question[]): Question[] {
    if (this.tags && this.tags !== 'random') {
      questions = questions.filter((question: Question) =>
        question.tags.some((tag: string) => tag === this.tags)
      );
    }
    if (this.difficulty !== 0) {
      questions = questions.filter((question: Question) => question.level === this.difficulty);
    } else if (this.difficulty === 0) {
      const easy = questions.filter((question: Question) => question.level === 1).slice(0, 15);
      const medium = questions.filter((question: Question) => question.level === 2).slice(0, 10);
      const hard = questions.filter((question: Question) => question.level === 3).slice(0, 5);
      questions = [...easy, ...medium, ...hard];
    }
    const arr = questions
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .slice(0, 30);
    return arr;
  }
  ngOnInit(): void {
    this.quiz = this.activatedRoute.snapshot.paramMap.get('id');
    this.difficulty = coerceNumberProperty(
      this.activatedRoute.snapshot.queryParamMap.get('difficulty') as string
    );
    this.tags = this.activatedRoute.snapshot.queryParamMap.get('tags') as string;

    this.httpClient
      .get<Question[]>('questions_' + this.quiz?.toLowerCase())
      .pipe(
        // TODO: remove filter when back is made
        map((questions: Question[]) => this.checkQuestions(questions)),
        tap({next: (value: any) => (this.questions = value)}),
        takeUntil(this.destroy$)
      )
      .subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
