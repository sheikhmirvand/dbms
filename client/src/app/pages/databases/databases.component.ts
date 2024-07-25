import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IGetDatabases } from '../../types/types';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-databases',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './databases.component.html',
  styleUrl: './databases.component.css',
})
export class DatabasesComponent implements OnInit {
  databases: IGetDatabases[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getDatabases().subscribe((data: any) => {
      this.databases = data;
    });
  }
}
