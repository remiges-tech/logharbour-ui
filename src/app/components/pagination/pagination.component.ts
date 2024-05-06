import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-pagination',
  template: `
  <div *ngIf="data != undefined && collectionSize > 0">
    <ng-content></ng-content>
    <nav aria-label="Pagination index">
      <ul class="pagination justify-content-center">
        <!-- Previous Button -->
        <li [class]="currentPage === 1 ? 'page-item disabled' : 'page-item'">
          <button class="page-link" (click)="previous()">Prev</button>
        </li>
        <ng-container *ngFor="let p of totalPages; index as i">
          <li
            *ngIf="i + 1 >= currentPage - maxSize && i + 1 <= currentPage + maxSize"
            [class]="currentPage === i + 1 ? 'page-item active' : 'page-item'"
          >
            <button class="page-link" (click)="selectPageNumber(i + 1)">
              {{ i + 1 }}
            </button>
          </li>
        </ng-container>
        <!-- Next Button -->
        <li [class]="'page-item'">
          <button class="page-link" (click)="next()">Next</button>
        </li>
      </ul>
    </nav>
  </div>
  `
})
export class PaginationComponent implements OnChanges {
  public _commonService = inject(CommonService);
  @Input({ required: true }) data?:any[];
  @Input({ required:true }) collectionSize:number = 0;
  @Output() timeStamp = new EventEmitter<any>();
  itemPerPage = 5;
  currentPage = 1;
  maxSize = 2;
  totalPages: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.itemPerPage));
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.itemPerPage));
    if(changes['collectionSize'] && changes['collectionSize'].previousValue > changes['collectionSize'].currentValue){
      this.selectPageNumber(1);
    }
  }

  selectPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  next() {
    const nextPage = this.currentPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
    if(nextPage > this.totalPages.length){
      this.nextClickHandler();
    }
  }

  previous() {
    const previousPage = this.currentPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
  }

  nextClickHandler() {
    if (!this.data) {
      return;
    }
    let lastIndexTime = this.data[this.data.length - 1].when;
    this.timeStamp.emit(lastIndexTime);
  }
}
