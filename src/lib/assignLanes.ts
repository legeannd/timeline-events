/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */

interface Item {
  id: number;
  start: string;
  end: string;
  name: string;
}

export function assignLanes(items: Item[]): Item[][] {
  const sortedItems = items.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  const lanes: Item[][] = [];

  function assignItemToLane(item: Item): void {
    for (const lane of lanes) {
      if (
        new Date(lane[lane.length - 1].end).getTime() <
        new Date(item.start).getTime()
      ) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }
  return lanes;
}
