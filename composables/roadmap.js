import { roadmap } from '@/datas'

export const useRoadmap = () => {

  /** Create array with step counter */
  roadmap.forEach((road, index) => {
    let ok = 0
    roadmap[index].step = road.list.length
    for (let i in road.list) {
      if (road.list[i].etat === 1) ok++
    }
    roadmap[index].step_ok = ok
    roadmap[index].percent = ((roadmap[index].step_ok / roadmap[index].step) * 100).toFixed(0)
  })

  return {
    roadmap
  }

}