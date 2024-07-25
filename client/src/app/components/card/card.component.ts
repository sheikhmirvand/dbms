import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  @Input() name: string;
  @Input() baseUrl: string;
  @Input() type: string;
  route: string;

  isShow: boolean = false;

  ngOnInit(): void {
    this.isShow = this.type === 'table';
    // @ts-ignore
    this.activatedRoute.params.subscribe((data) => (this.route = data));
  }

  delet() {
    this.apiService
      .deletTable(this.route)
      .subscribe((data) => console.log(data.status));
  }
}
