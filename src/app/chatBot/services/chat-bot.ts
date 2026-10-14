
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);

  sendMessage(
    messages: ApiChatMessage[]
  ): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(
      'http://localhost:3000/api/chat',
      { messages }
    );
  }
}
