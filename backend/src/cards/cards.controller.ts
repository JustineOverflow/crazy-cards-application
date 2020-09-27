import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

const cards = {
  'Student Life': {
    'details': {
      'id': 1,
      'name': 'Student Life',
      'apr': 18.9,
      'balance': 0,
      'purchase': 6,
      'credit': 1200,
    },
    'requirements': {
      'minIncome': 0,
      'employment': 'student',
    },
  },
  'Anywhere Card': {
    'details': {
      'id': 2,
      'name': 'Anywhere Card',
      'apr': 33.9,
      'balance': 0,
      'purchase': 0,
      'credit': 300,
    },
    'requirements': {
      'minIncome': 0,
      'employment': ['student', 'full-time', 'part-time', 'unemployed'],
    },
  },
  'Liquid Card': {
    'details': {
      'id': 3,
      'name': 'Liquid Card',
      'apr': 33.9,
      'balance': 12,
      'purchase': 6,
      'credit': 3000,
    },
    'requirements': {
      'minIncome': 16000,
      'employment': ['student', 'full-time', 'part-time', 'unemployed'],
    },
  },
};

export function filterEligibleCards(employment, income) {
  return Object.keys(cards)
    .filter(card => income >= cards[card].requirements.minIncome)
    .filter(card => cards[card].requirements.employment.includes(employment));
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

    const eligibles = filterEligibleCards(employment, income);
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

    const details = cards[card].details;
    response.status(HttpStatus.ACCEPTED).json({ details: details });
  }

}
