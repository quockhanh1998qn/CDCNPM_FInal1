import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-service',
  templateUrl: './item-service.component.html',
  styleUrls: ['./item-service.component.scss']
})
export class ItemServiceComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() {
  }

}
