import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { take, first, catchError, withLatestFrom, startWith } from 'rxjs/operators';
import { TypeSafeFormBuilder } from 'ngx-type-safe-reactive-form';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppEnvironmentService } from 'src/app/core/environment/app-environment.service';
import { AppEnvironment } from 'src/app/core/environment/models/app-environment.model';
import { combineLatest, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscriptionService } from 'src/app/core/push/subscription.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

type CannotSubscribeReason = 'permisionDefined' | 'serviceWorkerNotSupported';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  readonly subscribeFormControl = this.formBuilder.control({
    value: false,
    disabled: true,
  });

  get cannotSubscribeReason(): CannotSubscribeReason | null {
    if (!this.swPush.isEnabled) {
      return 'serviceWorkerNotSupported';
    }
    if (isPlatformBrowser(this.platformId) && Notification.permission === 'denied') {
      return 'permisionDefined';
    }
    return null;
  }

  get cannotSubscribeReasonText(): string | null {
    switch (this.cannotSubscribeReason) {
      case 'permisionDefined':
        return '通知がブロックされているため設定できません';
      case 'serviceWorkerNotSupported':
        return 'サポートされていないブラウザーのため設定できません';
    }
    return null;
  }

  constructor(
    private swPush: SwPush,
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: TypeSafeFormBuilder,
    private appEnvironmentService: AppEnvironmentService,
    private snackBar: MatSnackBar,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.swPush.isEnabled) {
      combineLatest([
        this.swPush.subscription.pipe(take(1)),
        this.appEnvironmentService.environmentChanges.pipe(first((env): env is AppEnvironment => !!env)),
      ]).subscribe(([subscription, appEnv]) => {
        this.subscribeFormControl.enable();
        // 初期値を設定
        this.subscribeFormControl.reset(!!subscription);

        this.subscribeValueChanges(appEnv);
      });

      // 通知のメッセージ内容をログ出力
      this.swPush.messages.pipe(untilDestroyed(this)).subscribe(message => {
        console.log('message:', message);
      });

      // 通知をクリックしたらログ出力
      this.swPush.notificationClicks.pipe(untilDestroyed(this)).subscribe(val => {
        console.log('notification click:', val);
      });
    }
  }

  onLogout() {
    if (this.authService.authenticated) {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
        this.snackBar.open('ログアウトしました');
      });
    }
  }

  private subscribeValueChanges(appEnv: AppEnvironment) {
    this.subscribeFormControl.valueChanges.pipe(untilDestroyed(this))
      .pipe(
        withLatestFrom(this.swPush.subscription.pipe(startWith(null)))
      )
      .subscribe(async ([isSubscribe, currentSubscription]) => {
        this.subscribeFormControl.disable({ emitEvent: false });

        try {
          if (isSubscribe) {
            const subscription = await this.swPush.requestSubscription({
              serverPublicKey: appEnv.applicationServerKey,
            });

            // subscriptionをログ出力
            console.log('subscription:', subscription.toJSON());

            await this.subscriptionService.update(subscription.toJSON())
              .pipe(
                catchError(err => {
                  // サーバーへの登録に失敗した場合は購読解除する
                  this.swPush.unsubscribe();
                  return throwError(err);
                })
              )
              .toPromise();

            this.snackBar.open(`通知をONにしました`);
          } else {
            await this.swPush.unsubscribe();
            // サーバーへの登録を削除する
            // 最悪残ってしまってもいいので、swPush.unsubscribeの後で削除して、例外もキャッチしない
            if (currentSubscription) {
              this.subscriptionService.delete(currentSubscription.endpoint).subscribe();
            }
            this.snackBar.open(`通知をOFFにしました`);
          }
        } catch (error) {
          this.snackBar.open(`通知を${isSubscribe ? 'ON' : 'OFF'}にしているときにエラーが発生が発生しました`);

          console.error(error);
          // 元の値に戻す
          this.subscribeFormControl.setValue(!this.subscribeFormControl.value, { emitEvent: false });
        } finally {
          this.subscribeFormControl.enable({ emitEvent: false });
        }
      });
  }

}
