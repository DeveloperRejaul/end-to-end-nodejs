import Event from 'node:events';

export class TicketManager extends Event {

  constructor (public supply: number) {
    super();
  }

  public buy (email: string, price: number) {
    if(this.supply > 0 ) {
      this.supply = this.supply -1;
      this.emit('BUY', email, price, Date.now());
      return;
    } 
    this.emit('ERROR', new Error('There No more tickets lift  to purchase'));
  }

}