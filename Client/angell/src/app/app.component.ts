import { Component } from '@angular/core';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private messageService: MessageService) {}
  title = 'Angell';
  msgs: Message[] = [];
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Message', detail:'Order submitted'});

  }

  
}
