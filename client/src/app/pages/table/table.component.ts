import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() dbName = '';
  @Input() tableName = '';
  columnsName: any;
  recorsds: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.dbName = data.dbName;
      this.tableName = data.tableName;
    });

    this.api.getTable(this.dbName, this.tableName).subscribe((data) => {
      console.log(data.status);

      // @ts-ignore
      this.columnsName = Object.keys(data.body[0]);
      this.recorsds = data.body;
    });
  }

  ngOnDestroy(): void {
    this.columnsName = [];
    this.recorsds = [];
  }
}
