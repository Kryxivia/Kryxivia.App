export const useRain = (front, back) => {

  const drop = (direction, increment, randoHundo, randoFiver) => {
    return `
      <div class="drop" style="${direction}:${increment}%;bottom:${(randoFiver + randoFiver - 1 + 100)}%;animation-delay:.${randoHundo}s;animation-duration:.5${randoHundo}s">
        <div class="stem" style="animation-delay:.${randoHundo}s;animation-duration:.5${randoHundo}s"></div>
        <div class="splat" style="animation-delay:.${randoHundo}s;animation-duration:.5${randoHundo}s"></div>
      </div>`
  }

  let increment = 0
  let drops = ""
  let backDrops = ""

  while (increment < 100) {
    const randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
    const randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))
    increment += randoFiver
    drops += drop('left', increment, randoHundo, randoFiver)
    backDrops += drop('right', increment, randoHundo, randoFiver)
  }

  qs(front).insertAdjacentHTML('beforeend', drops)
  qs(back).insertAdjacentHTML('beforeend', backDrops)

}