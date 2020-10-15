import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { StreamsModule } from './streams/streams.module';
import { TasksJobsModule } from './tasks-jobs/tasks-jobs.module';
import { ManageModule } from './manage/manage.module';
import { SecurityModule } from './security/security.module';
import { SettingsModule } from './settings/settings.module';
import { SecurityService } from './security/service/security.service';
import { ROOT_REDUCERS, metaReducers } from './reducers/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppsModule } from './apps/apps.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    StreamsModule,
    TasksJobsModule,
    ManageModule,
    SecurityModule,
    SettingsModule,
    AppsModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      // APP_INITIALIZER是在Angular2.x程序启动之前执行的一个函数，可以在这个里面进行自动登录，判断登录token，阻止启动等一系列操作，可以在AppModule类的
      // providers中以factory的形式来配置，factory是一个返回值为promise的函数。
      provide: APP_INITIALIZER,
      useFactory: (securityService: SecurityService) => {
        return () => {
          return new Promise((resolve) => {
            securityService.loaded(false, false, null, []);
            resolve();
          });
        };
      },
      deps: [SecurityService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
