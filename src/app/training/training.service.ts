import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {

  }

  public getAvailableExercises() {
    return this.availableExercises.slice();
  }

  public startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise })
  }

  public fetchRunningExercise(): void {
    this.db
    .collection('availableExercises')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name || null, //pulling data from data() out on the above object
          duration: doc.payload.doc.data().duration || null,
          calories: doc.payload.doc.data().calories || null
        }
      })
    }))
    .subscribe((exercises: Exercise[]) => {
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
  }

  public completeExercise(): void {
    this.exercises.push({...this.runningExercise, date:new Date(), state:'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public cancelExercise(progress: number): void {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date:new Date(),
      state:'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public getCompletedOrCancelledExercises(): Exercise[] {
    return this.exercises.slice();
  }

  private addDataToDatabase(exercise: Exercise) {
    
  }

}
