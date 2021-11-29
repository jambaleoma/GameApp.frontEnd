import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Modal } from '../_models/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private infoModalSubject = new Subject<any>();

  sendInfoModal(type: String, message: String, price: string, header: string, path: String) {
    this.infoModalSubject.next(this.createModal(type, message, price, header, path));
  }

  clearInfoModal() {
    this.infoModalSubject.next(null);
  }

  getInfoModal(): Observable<any> {
    return this.infoModalSubject.asObservable();
  }

  createModal(type: String, message: String, price: string, header: string, path: String) {
    const modal: Modal = {
      type: type,
      message: message,
      price: price,
      header: header,
      path: path
    };
    return modal;
  }
}
