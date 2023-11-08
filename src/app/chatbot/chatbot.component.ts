import { Component } from '@angular/core';
import { OpenAiApiService } from '../services/open-ai-api.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string; content: string }[] = [];
  isLoading!: boolean;
  
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private openAiApiService: OpenAiApiService) {}

  

  sendMessage() {
    this.isLoading = true;
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.openAiApiService
      .sendMessage(this.userMessage)
      .subscribe((response) => {
        this.isLoading = false;
        this.assistantReply = response.reply;
        this.chatMessages.push({
          role: 'assistant',
          content: this.assistantReply,
        });
        this.userMessage = '';
        this.scrollToBottom();
      });
  }

  sendMessages() {
    this.isLoading = true;
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    // Create a string of all the messages separated by a newline
    // and add a newline at the end
    var cm = this.chatMessages.map((message) => message.content).join('\n') + '\n';
    
    this.openAiApiService
      .sendMessage(cm)
      .subscribe((response) => {
        this.isLoading = false;
        this.assistantReply = response.reply;
        this.chatMessages.push({
          role: 'assistant',
          content: this.assistantReply,
        });
        this.userMessage = '';
        this.scrollToBottom();
      });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
