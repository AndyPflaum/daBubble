// src/app/group-chat/group-chat.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogChannelEditComponent } from '../dialogs/dialogs-channel/dialog-channel-edit/dialog-channel-edit.component';
import { DialogChannelMembersComponent } from '../dialogs/dialogs-channel/dialog-channel-members/dialog-channel-members.component';
import { DialogChannelAddMembersComponent } from '../dialogs/dialogs-channel/dialog-channel-add-members/dialog-channel-add-members.component';

@Component({
  selector: 'app-group-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit {
  groupId!: string; // Typ auf string geändert, da URL-Parameter normalerweise als string kommen
  groupName!: string;

  currentDate!: string;
  currentTime!: string;
  displayDate!: string;
  imgSrc = ['assets/img/smiley/add_reaction.png', 'assets/img/smiley/comment.png','assets/person_add.png'];
  imgTextarea =['assets/img/add.png','assets/img/smiley/sentiment_satisfied.png','assets/img/smiley/alternate_email.png','assets/img/smiley/send.png']


  constructor(
    private route: ActivatedRoute,
    private dialogChannel: MatDialog,
    private dialogChannelMemberList: MatDialog,
    private dialogChannelAddMember: MatDialog,
  ) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') || '';
    this.groupName = this.route.snapshot.paramMap.get('name') || '';

    console.log('groupId:', this.groupId);
    console.log('groupName:', this.groupName);

    // Formatierung der Zeit und des Datums
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
    this.currentTime = this.formatTime(today);
    this.displayDate = this.isToday(today) ? 'Heute' : this.currentDate;

    // Hier könntest du auch weitere Logik einfügen, um Daten für den Kanal zu laden
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  changeImageSmiley(isHover: boolean) {
    this.imgSrc[0] = isHover ? 'assets/img/smiley/add_reaction-blue.png' : 'assets/img/smiley/add_reaction.png';
  }

  changeImageComment(isHover: boolean) {
    this.imgSrc[1] = isHover ? 'assets/img/smiley/comment-blue.png' : 'assets/img/smiley/comment.png';
  }
  changeImageAddContat(isHover: boolean){
    this.imgSrc[2] = isHover ? 'assets/person_add_blue.png' : 'assets/person_add.png';
  }
  changeAdd(isHover: boolean){
    this.imgTextarea[0] = isHover ? 'assets/img/smiley/add-blue.png' : 'assets/img/add.png';
  }
  addSmiley(isHover: boolean){
    this.imgTextarea[1] = isHover ? 'assets/img/smiley/sentiment_satisfied-blue.png' : 'assets/img/smiley/sentiment_satisfied.png';
  }
  addEmailContact(isHover: boolean){
    this.imgTextarea[2] = isHover ? 'assets/img/smiley/alternate_email-blue.png' : 'assets/img/smiley/alternate_email.png';
  }
  sendNews(isHover: boolean){
    this.imgTextarea[3] = isHover ? 'assets/img/smiley/send-light-blue.png' : 'assets/img/smiley/send.png';
  }

  openDialog(){
    let dialogRef = this.dialogChannel.open(DialogChannelEditComponent, {
      panelClass: 'border-30',
      width: '700px',
      height: '400px',
    });
  }
  openDialogMemberList(){
    let dialogRef = this.dialogChannelMemberList.open(DialogChannelMembersComponent, {
      panelClass: 'border-30-right',
      width: '300px',
      height: '300px',
      position: {top: '200px', right: '100px'},

    });
  }
  openDialogAddMember(){
    let dialogRef = this.dialogChannelAddMember.open(DialogChannelAddMembersComponent, {
      panelClass: 'border-30-right',
      width: '400px',
      height: '200px',
      position: {top: '200px', right: '50px'},

    });
  }
}
