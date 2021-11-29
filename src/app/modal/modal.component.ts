import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Modal } from '../_models/modal';
import { ModalService } from '../_services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  title: String;
  price: string;
  path: String;
  headerText: string;
  displayModal: boolean;
  subscription: Subscription;

  constructor(public modalService: ModalService) {
    this.subscription = this.modalService.getInfoModal().subscribe((modal: Modal) => {
      if (modal) {
        this.title = modal.message;
        this.price = modal.price;
        this.headerText = modal.header;
        this.path = modal.path;
        this.showModalDialog();
      }
    });
  }

  showModalDialog() {
    this.displayModal = true;
  }

}
