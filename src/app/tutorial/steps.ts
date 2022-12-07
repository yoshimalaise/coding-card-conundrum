// tutorial: https://github.com/shipshapecode/angular-shepherd

const defaultOptions = {
  buttons: [
    {
      classes: 'shepherd-button-primary',
      text: 'Back',
      type: 'back'
    },
    {
      classes: 'shepherd-button-primary',
      text: 'Next',
      type: 'next'
    }
  ],
  cancelIcon: {
      enabled: false
  },
}

export const tutorialSteps: any[] = [
  {
    title: 'Welcome!',
    text: ['Welcome to CodeCards! An interactive card game that will help you learn how to use trace tables!'],
    ...defaultOptions,
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
  },
  {
    title: 'Welcome!',
    text: ['The game can be played by 1 to 4 players.'],
    ...defaultOptions
  },
  {
    title: 'Environments',
    text: ['This is an environment. There will be one more environment than there are players in the game. Every environment will contain default values for the 5 variables (foo, bar, x, y, z).'],
    attachTo: { 
        element: '.trail', 
        on: 'right'
    },
    ...defaultOptions
  },
  {
    title: 'Hand',
    text: ['This is your hand. In your hand you will find 5 code cards. These cards are for your eyes only, so keep them hidden from the other players!'],
    attachTo: { 
        element: '.hand', 
        on: 'top'
    },
    ...defaultOptions
  },
  {
    title: 'Goal card',
    text: ['Next to your code cards, you will also find a goal card in your hand. This card will describe the conditions that have to be met for you to score points. The amount of points you will gain by completing the goal is indicated at the bottom of the card.'],
    attachTo: { 
        element: '.goal-container', 
        on: 'top'
    },
    ...defaultOptions
  },
  {
    title: 'Goal of the game',
    text: ['The goal of the game is to turn by turn play a code card from your hand onto one of the stacks on the table. Doing this action you will \'execute\' this code in that environment, it is then up to you to update the trace table of that stack.'],
    attachTo: { 
        element: '.goal-container', 
        on: 'top'
    },
    ...defaultOptions
  },
  {
    title: 'Goal of the game',
    text: ['If the updated environment satisfies all the constraints described in your goal card you will gain points.'],
    attachTo: { 
        element: '.goal-container', 
        on: 'top'
    },
    ...defaultOptions
  },
  {
    title: 'Current environment',
    text: ['The latest values from the trace table for each variable can be found in the environment table.'],
    attachTo: { 
        element: '.trophy-button', 
        on: 'right'
      },
    ...defaultOptions
  },
  {
    title: 'Winning the game',
    text: ['The first player that gains a predetermined amount of points (depending on the amount of players) wins.'],
    ...defaultOptions
  },
  {
    title: 'Winning the game',
    text: ['To look at the current ranking you can click the trophy icon at any point in the game.'],
    attachTo: { 
      element: '.environment-table', 
      on: 'bottom'
    },
    ...defaultOptions
  },
  {
    title: 'Winning the game',
    text: ['You are now ready to play the game! Good luck!'],
    ...defaultOptions
  }
];