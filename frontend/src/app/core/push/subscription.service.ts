import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient,
  ) { }

  update(subscription: PushSubscriptionJSON) {
    return this.http.put<void>('/api/subscription', subscription);
  }

  delete(endpoint: string) {
    return this.http.delete<void>(`/api/subscription/${endpoint}`);
  }

}
