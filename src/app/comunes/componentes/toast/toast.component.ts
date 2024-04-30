import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
})
export class ToastComponent {
  @Input() mensajeError: string = "";
  @Input() mostrarToast: boolean = false;
}
