import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '@app/core/services/user.service';
import { MarketService } from '../services/market.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-rpg-page',
  templateUrl: './rpg-page.component.html',
  styleUrls: ['./rpg-page.component.scss']
})
export class RpgPageComponent implements OnInit, OnDestroy, AfterViewInit {
  user: any = null;
  marketItems: any = [];
  private subs = new SubSink();

  chars: string[] = [];
  pointerPos: any;
  widths: string[] = [];
  animationDelay = 3000;
  offset = 200;

  constructor(
    private userService: UserService,
    private marketService: MarketService
  ) { }

  ngOnInit(): void {
    this.loadMarket();
    this.addSpeedUpEvent();
    this.chars = this.formatWhiteSpace(this.convertStringToChars('i ❤ u so much!!!'));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
 }

  ngAfterViewInit(): void {
    this.loopChangePointerPos();
  }

  getUser(userId: string): void  {
    this.subs.add(this.userService.find(userId).subscribe((response: any) => {
      this.user = response.body && response.body;
    }));
  }

  loadMarket(): void {
    this.subs.add(this.marketService.query().subscribe((response: any) => {
      this.marketItems = response.body && response.body;
    }));
  }

  buy(item: any, quantity = 1): void {
    if (this.user) {
      if (item.quantity >= quantity) {
        item.quantity -= quantity;
        const existItem = this.user.character.items.find((charItem: any) => charItem.name === item.detail.name);
        if (existItem) {
          const itemIndex = this.user.character.items.indexOf(existItem);
          existItem.quantity += quantity;
          this.user.character.items[itemIndex] = existItem;
          this.user.character.gold -= quantity * item.price;
        } else {
          const newItem = {...item.detail, quantity};
          this.user.character.items.push(newItem);
        }
        this.subs.add(this.marketService.update(item).subscribe((response: any) => {
          console.log('success');
        }));
        this.subs.add(this.userService.update(this.user).subscribe((response: any) => {
          console.log('success');
        }));
        this.getUser(this.user.id);
        this.loadMarket();
      }
    }
  }

  convertStringToChars(input: string): string[] {
    return input.split('');
  }

  formatWhiteSpace(chars: string[]): string[] {
    let result: string[] = [];
    for (const char of chars) {
      let newChar = char;
      if (char === ' ') {
        newChar = '\u00A0';
      }
      result = [...result, newChar];
    }
    return result;
  }

  getAppearAnimation(index: number, offset: number): any {
    return {
      animation: `appear ${offset}ms linear forwards`,
      animationDelay: `${index * offset + this.animationDelay}ms`
    };
  }

  changePointerPos(renderTimes: number, timer: number): void {
    let i = 0;
    const chars = document.querySelectorAll('.hidden-char');
    const changePosInterval = setInterval(() => {
      if (chars.item(i + 1)) {
        this.pointerPos = {
          top: (chars.item(i + 1) as HTMLElement).offsetTop + 'px',
          left: (chars.item(i + 1) as HTMLElement).offsetLeft + 'px',
          width: (chars.item(i + 1) as HTMLElement).offsetWidth + 'px',
          animation: 'none'
        };
      }
      i++;
    }, timer);
    setTimeout(() => {
      this.pointerPos = {
        top: (chars.item(renderTimes - 1) as HTMLElement).offsetTop + 'px',
        left: (chars.item(renderTimes - 1) as HTMLElement).offsetLeft + (chars.item(renderTimes - 1) as HTMLElement).offsetWidth + 'px',
        width: 5 + 'px',
        animation: 'flicker 1s linear infinite'
      };
      clearInterval(changePosInterval);
    }, timer * renderTimes);
  }

  loopChangePointerPos(): void {
    const renderTimes = this.chars.length;
    const chars = document.querySelectorAll('.hidden-char');
    this.pointerPos = {
      top: (chars.item(0) as HTMLElement).offsetTop + 'px',
      left: (chars.item(0) as HTMLElement).offsetLeft + 'px',
      width: (chars.item(0) as HTMLElement).offsetWidth + 'px'
    };
    setTimeout(() => this.changePointerPos(renderTimes, this.offset), this.animationDelay);
  }

  addSpeedUpEvent(): void {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.offset = 150;
      }
    });
  }
}
