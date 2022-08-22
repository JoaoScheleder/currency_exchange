import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  
  currency : string = ''

  @Output() currencyChange = new EventEmitter<string>();

  @ViewChild('label') label!: ElementRef;
  @ViewChild('input') input!: ElementRef
  constructor() { }

  

  ngOnInit(): void {
  }

  handleChange(){
    this.currencyChange.emit(this.currency)
    if(this.currency.length > 0){
      this.label.nativeElement.classList.add('selected')
      this.input.nativeElement.classList.add('hasText')
      return
    }
    this.label.nativeElement.classList.remove('selected')
    this.input.nativeElement.classList.remove('hasText')

  }



}
