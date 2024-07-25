import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ITable } from '../../types/types';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { NgxEditorModule, Editor } from 'ngx-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [CommonModule, CardComponent, NgxEditorModule, FormsModule],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css',
})
export class DatabaseComponent implements OnInit, OnDestroy {
  path: string;
  public tables: any[];
  public fieldName: string;
  editor: Editor;
  html = '';
  processedContent: string = '';

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.activatedRoute.params
      // @ts-ignore
      .subscribe((data) => (this.path = data.name));
    // .unsubscribe();
    this.api.getDatabase(this.path).subscribe((data) => {
      this.tables = data;
      this.fieldName = Object.keys(data[0])[0];
    });
  }

  editorChange(event: any): void {
    this.html = event;
    this.processedContent = this.removePTags(this.html);
  }

  removePTags(html: string): string {
    // Use a DOMParser to safely parse and manipulate the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;

    // Remove <p> tags and keep their inner HTML content
    const contentWithoutPTags = Array.from(body.childNodes)
      .map((node: any) => {
        return node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'P'
          ? node.innerHTML
          : node.outerHTML || node.textContent;
      })
      .join('');

    return contentWithoutPTags;
  }

  onSubmit() {
    this.api
      .queryToDb(this.processedContent, this.path)
      .subscribe((data) => console.log(data.body));
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.tables = [];
  }
}
