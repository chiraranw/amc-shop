import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, SharedModule],
})
export class MessageModule {}
