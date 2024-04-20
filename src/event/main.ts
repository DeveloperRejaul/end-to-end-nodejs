import {TicketManager} from './event';
import {Database} from './db';
import {Email} from './email';

const emailService = new Email ();
const db = new Database ();
const ticketManager = new TicketManager(3);


ticketManager.on('BUY', (email: string, price: number , timestamp: number)=> {
  emailService.send(email);
  db.save(email, price , timestamp);
});

ticketManager.on('ERROR', (error)=> {
  console.error(error.message);
});


ticketManager.buy('rejaulkarim1@gmail.com', 10);
ticketManager.buy('rejaulkarim2@gmail.com', 10);
ticketManager.buy('rejaulkarim3@gmail.com', 10);
ticketManager.buy('rejaulkarim4@gmail.com', 10);

// remove Listeners
ticketManager.removeAllListeners();