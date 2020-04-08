export interface ICanvasDimension {
  width: number,
  height: number,
}

export default (): ICanvasDimension => {
  const canvasDimensions = [
    // Medium devices (tablets, 768px and up)
    {
      width: 750,
      height: 600,
    },
    // Large devices (desktops, 992px and up)
    {
      width: 1024,
      height: 768,
    },
    // Extra large devices (large desktops, 1200px and up)
    {
      width: 1300,
      height: 830,
    },
  ]

  // search for last canvasDimension which is smaller than window
  for (let sizeIndex = 1; sizeIndex < canvasDimensions.length; sizeIndex++) {
    const lastSize = canvasDimensions[sizeIndex -1];
    const canvasSize = canvasDimensions[sizeIndex];
    if (canvasSize.width > window.innerWidth)
      return lastSize;
  }
  // or return last option
  return canvasDimensions[canvasDimensions.length -1];
}