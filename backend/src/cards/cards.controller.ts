import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

const cards = {
  'student-life': {
    'id': 1,
    'name': 'Student Life',
    'apr': 18.9,
    'balance': 0,
    'purchase': 6,
    'credit': 1200,
  },
  'anywhere-card': {
    'id': 2,
    'name': 'Anywhere Card',
    'apr': 33.9,
    'balance': 0,
    'purchase': 0,
    'credit': 300,
  },
  'liquid-card': {
    'id': 3,
    'name': 'Liquid Card',
    'apr': 33.9,
    'balance': 12,
    'purchase': 6,
    'credit': 3000,
  },
};

export function filterEligibleCards(employment, income) {
  let listOfCards = [];
  listOfCards.push('Anywhere Card');
  if (income >= 16000) {
    listOfCards.push('Liquid Card');
  }
  if (employment === 'student') {
    listOfCards.push('Student Life');
  }
  return listOfCards;
}

@Controller('cards')
export class CardsController {

  @Get()
  getEligibleCards(@Res() response: Response,
                   @Query('employment') employment?: string,
                   @Query('income') income?: string) {

    if (employment.length === 0) {
      response.status(HttpStatus.BAD_REQUEST).json({
        reason: 'Missing employment information',
      });
      return;
    }
    if (income.length === 0) {
      response.status(HttpStatus.BAD_REQUEST).json({
        reason: 'Missing income information',
      });
      return;
    }

    let eligibles = filterEligibleCards(employment, income);

    response.status(HttpStatus.ACCEPTED).json({ eligibles: eligibles });
  }

  @Get('/details')
  getCardDetails(@Res() response: Response,
                 @Query('card') card?: string) {
    if (card.length === 0) {
      response.status(HttpStatus.BAD_REQUEST).json({
        reason: 'No card selected',
      });
      return;
    }

    let details = cards[card];

    response.status(HttpStatus.ACCEPTED).json({ details: details });

  }

}
