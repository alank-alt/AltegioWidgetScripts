import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ScriptItem {
  name: string;
  size: number;
  lastModified: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  scripts: ScriptItem[] = [];
  selectedScript: string | null = null;
  scriptContent: string = '';
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<ScriptItem[]>('/assets/scripts.json').subscribe({
      next: (data) => {
        this.scripts = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load scripts', err)
    });
  }

  viewScript(scriptName: string) {
    if (this.selectedScript === scriptName) {
      this.selectedScript = null;
      this.cdr.detectChanges();
      return;
    }
    
    this.http.get(`/Scripts collection/${scriptName}`, { responseType: 'text' }).subscribe({
      next: (content) => {
        this.scriptContent = content;
        this.selectedScript = scriptName;
        this.cdr.detectChanges();
      },
      error: (err) => alert('Failed to load script content')
    });
  }

  copyScript(scriptName: string) {
    this.http.get(`/Scripts collection/${scriptName}`, { responseType: 'text' }).subscribe({
      next: (content) => {
        navigator.clipboard.writeText(content).then(() => {
          // Could add a toast notification here
        });
      },
      error: (err) => alert('Failed to load script content')
    });
  }

  downloadScript(scriptName: string) {
    const link = document.createElement('a');
    link.href = `/Scripts collection/${scriptName}`;
    link.download = scriptName;
    link.click();
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}
