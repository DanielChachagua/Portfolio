import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailContact } from '../../models/email/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url: string = `${environment.apiUrl}email`;

  constructor(private httpClient: HttpClient) { }

  sendEmail(email: EmailContact) {
    return this.httpClient.post(`${this.url}/send_email`, email);
  }
}
