interface IGameElement {
  html: string;
}

export interface IGameUnitDataSet {
  gameElements: {
    correctHTMLElements: Array<IGameElement>;
    incorrectHTMLElements: Array<IGameElement>;
    endSessionHTML: IGameElement,
    sessionIdHTML: IGameElement,
    questionHTML: IGameElement, 
  };
}
