import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';

const cards = {
  'Student Life': {
    'Apr':
      18.9,
    'Balance Transfer Offer Duration':
      0,
    'Purchase Offer Duration':
      6,
    'Credit Available':
      1200,
  },
  'Anywhere Card': {
    'Apr':
      33.9,
    'Balance Transfer Offer Duration':
      0,
    'Purchase Offer Duration':
      0,
    'Credit Available':
      300,
  },
  'Liquid Card': {
    'Apr':
      33.9,
    'Balance Transfer Offer Duration':
      12,
    'Purchase Offer Duration':
      6,
    'Credit Available':
      3000,
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

    response.status(HttpStatus.ACCEPTED).json(eligibles);
  }
}