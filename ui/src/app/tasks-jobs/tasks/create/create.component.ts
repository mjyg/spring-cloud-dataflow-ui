import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../shared/service/notification.service';
import { TaskService } from '../../../shared/api/task.service';
import { Router } from '@angular/router';
import { Properties } from 'spring-flo';
import { Observable } from 'rxjs';
import { TaskFloCreateComponent } from '../../../flo/task/component/create.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../../flo/shared/flo.scss']
})
export class CreateComponent implements OnInit {

  errors: Array<string>;
  warnings: Array<string>;
  isOpen = false;
  isCreating = false;
  form: FormGroup;
  dsl: string;

  @ViewChild('flo', { static: true }) flo: TaskFloCreateComponent;

  taskName = new FormControl('',
    [Validators.required, Validators.maxLength(255)], [
      Properties.Validators.uniqueResource((value) => this.isUniqueTaskName(value), 500)
    ]);
  taskDescription = new FormControl('', Validators.maxLength(255));

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private router: Router,
              private notificationService: NotificationService) {
    this.form = fb.group({
      taskName: this.taskName,
      taskDescription: this.taskDescription
    });
  }

  ngOnInit() {
    this.errors = new Array<string>();
    this.warnings = new Array<string>();
  }

  submit() {
    this.isCreating = true;
    this.taskService.createTask(this.taskName.value, this.dsl, '')
      .subscribe(
        () => {
          this.notificationService.success('Task creation', 'Composed task created for ' + this.taskName.value);
          this.back();
        },
        (error) => {
          this.isCreating = false;
          this.notificationService.error('An error occurred', error);
        }
      );
    // }
  }

  isUniqueTaskName(name: string): Observable<boolean> {
    return new Observable<boolean>(obs => {
      if (name) {
        this.taskService.getTask(name)
          .subscribe(def => {
            if (def) {
              obs.next(false);
            } else {
              obs.next(true);
            }
            obs.complete();
          }, () => {
            obs.next(true);
            obs.complete();
          });
      } else {
        obs.next(true);
        obs.complete();
      }
    });
  }

  createTask() {
    this.taskService.createTask(window.location.search.substring(10), this.flo.dsl, '')
        .subscribe(
            () => {
              this.notificationService.success('Task creation', 'Composed task created for ' + this.taskName.value);
              this.back();
            },
            (error) => {
              this.isCreating = false;
              this.notificationService.error('An error occurred', error);
            }
        );
  }

  back() {
    window.close();
  }

}
