import { Component, inject, OnInit } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { collection, getDocs } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-answer',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './group-answer.component.html',
  styleUrl: './group-answer.component.scss'
})
export class GroupAnswerComponent implements OnInit {
  groupId: string | null = null;
  answerId: string | null = null;
  messageText: string = ''; // Nachrichtentext
  groupName: string = ''; // Gruppenname
  answerChat: string = ''; // Antworttext
  userName: string = ''; // Benutzername
  time: string = ''; // Zeit
  firestore: Firestore = inject(Firestore);
  channels$: Observable<any[]>;

  constructor(private route: ActivatedRoute, public userService: UserService) {
    const channelsCollection = collection(this.firestore, 'channels');

    // Daten aus der 'channels'-Sammlung holen und in Observable umwandeln
    this.channels$ = from(getDocs(channelsCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  }

  ngOnInit(): void {
    // Überwache die URL-Parameteränderungen
    this.route.paramMap.subscribe(params => {
      // Extrahiere groupId und answerId aus der URL
      this.groupId = this.route.snapshot.parent?.paramMap.get('id') || null;
      this.answerId = params.get('answerId') || null;
      
      // console.log('Group ID:', this.groupId);
      // console.log('Answer ID:', this.answerId);
      
      if (this.groupId && this.answerId) {
        this.fetchChannelsAndMessages();
      }
    });
  }

  // Methode zum Holen der Channels und Messages
  async fetchChannelsAndMessages() {
    try {
      const channels = await this.fetchChannels();
      if (channels && channels.length > 0) {
        for (const channel of channels) {
          if (channel.id) {
            const messages = await this.fetchMessagesForChannel(channel.id);
            const matchingMessage = this.findMatchingMessage(messages);
            if (matchingMessage) {
              this.processMatchingMessage(matchingMessage, channel);
              return;
            }
          }
        }
        console.log('Keine passende Nachricht gefunden.');
      } else {
        console.log('Keine Kanäle gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Kanäle oder Nachrichten:', error);
    }
  }

  // Kanäle abrufen
  async fetchChannels() {
    try {
      return await this.channels$.toPromise();
    } catch (error) {
      return [];
    }
  }

  // Nachrichten für einen Kanal abrufen
  async fetchMessagesForChannel(channelId: string) {
    try {
      const messagesCollection = collection(this.firestore, `channels/${channelId}/messages`);
      const messagesSnapshot = await getDocs(messagesCollection);
      return messagesSnapshot.docs.map(doc => ({
        ...doc.data() as { text: string, id: string, userName: string, time: string },
        id: doc.id
      }));
    } catch (error) {
      return [];
    }
  }

  // Nachricht finden, die zur AnswerId passt
  findMatchingMessage(messages: any[]) {
    return messages.find(message => message.id === this.answerId);
  }

  // Nachricht verarbeiten und Daten setzen
  processMatchingMessage(matchingMessage: any, channel: any) {
    console.log('Nachricht gefunden:', matchingMessage);

    const timeParts = matchingMessage.time.split(':');
    this.time = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;

    this.groupName = channel.name;
    this.messageText = matchingMessage.text;
    this.userName = matchingMessage.userName;
  }

  // Methode zum Extrahieren von GroupId und AnswerId
  giveGroupIdAndAnswerID() {
    // GroupId von der Elternroute holen
    this.route.parent?.paramMap.subscribe(parentParams => {
      this.groupId = parentParams.get('id'); // Gruppen-ID aus der Elternroute
      console.log('Group ID:', this.groupId);
      
      // Wenn GroupId verfügbar ist, Channels und Messages abrufen
      if (this.groupId) {
        this.fetchChannelsAndMessages();
      }
    });

    // AnswerId aus der aktuellen Route holen
    this.route.paramMap.subscribe(params => {
      this.answerId = params.get('answerId'); // Antwort-ID aus der aktuellen Route
      // console.log('Answer ID:', this.answerId);
    });
  }
}
