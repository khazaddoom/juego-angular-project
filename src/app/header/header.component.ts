import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  @Output() navigateTo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(featureSelected: string) {
    this.navigateTo.emit(featureSelected);
  }

}
