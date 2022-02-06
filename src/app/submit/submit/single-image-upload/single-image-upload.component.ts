import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Loader } from 'src/app/core/loader/loader'
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireUploadTask } from '@angular/fire/storage/task'
import { DestroyService } from 'src/app/core/services/destroy.service'
import { NotificationsService } from 'src/app/core/services/notifications.service'
import firebase from 'firebase'

@Component({
  selector: 'app-single-image-upload',
  templateUrl: './single-image-upload.component.html',
  styleUrls: ['./single-image-upload.component.scss'],
  providers: [DestroyService],
})
export class SingleImageUploadComponent implements OnInit {
  @Output() private readonly fileUploaded = new EventEmitter<string>()

  readonly imageUploadControl = this.formBuilder.control(null)

  task: AngularFireUploadTask
  uploadProgressPercentage: Observable<number>
  path: string

  readonly uploadFileAction$: Observable<void> = this.imageUploadControl.valueChanges.pipe(
    switchMap((file) => {
      this.path = `complaints/${Date.now()}_${file.name}`
      this.task = this.fireStorage.upload(this.path, file)
      this.uploadProgressPercentage = this.task.percentageChanges()

      return this.task.snapshotChanges()
    }),
    filter((task) => task.state === firebase.storage.TaskState.SUCCESS),
    switchMap(() => this.fireStorage.ref(this.path).getDownloadURL()),
    tap((downloadUrl) => this.fileUploaded.emit(downloadUrl)),
    tap({ error: console.log }),
    tap({ error: () => this.notificationService.showError('Something went wrong while upload your image!') }),
  )

  readonly loader = new Loader()

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly fireStorage: AngularFireStorage,
    private readonly destroy$: DestroyService,
    private readonly notificationService: NotificationsService,
  ) {}

  ngOnInit(): void {
    this.uploadFileAction$.pipe(takeUntil(this.destroy$)).subscribe()
  }
}
