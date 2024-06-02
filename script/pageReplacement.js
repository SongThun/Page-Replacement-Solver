export function pageReplacement(algo, reference, num_frames) {
  if (!['fifo', 'lru', 'optimal', 'clock'].includes(algo)) {
    throw new Error('Invalid page replacement algorithm. Please use fifo, lru, optimal or clock');
  }

  if (num_frames < 1) {
    throw new Error('Num_frames must be greater than 1');
  }

  let cache = [];
  let time_slice = [];
  let page_fault = [];
  let queue = [];
  let ref_bits = new Array(num_frames).fill(0);
  let pointer = 0;

  for (let i = 0; i < reference.length; i++) {
    let page = reference[i];
    if (!cache.includes(page)) {
      page_fault.push(1);
      if (algo === 'fifo') {
        queue.push(page);
      }

      if (cache.length < num_frames) {
        cache.push(page);
      } else {
        let victim = cache[0];
        switch (algo) {
          case 'fifo':
            victim = queue.shift();
            break;
          case 'lru':
            let past = reference.slice(0, i).reverse();
            let least_recently_id = Math.max(...cache.map(page => past.indexOf(page)));
            victim = past[least_recently_id];
            break;
          case 'optimal':
            let future = reference.slice(i + 1);
            let no_more_use = cache.filter(page => !future.includes(page));
            let future_id = cache.filter(page => future.includes(page)).map(page => future.indexOf(page));
            victim = no_more_use.length > 0 ? no_more_use[0] : cache[future_id.indexOf(Math.max(...future_id))];
            break;
          case 'clock':
            while (ref_bits[pointer] !== 0) {
              ref_bits[pointer] = 0;
              pointer = (pointer + 1) % num_frames;
            }
            victim = cache[pointer];
            break;
        }

        let id = cache.indexOf(victim);
        cache.splice(id, 1, page);
      }

      if (algo === 'clock') {
        ref_bits[pointer] = 1;
        pointer = (pointer + 1) % num_frames;
      }
    } else {
      page_fault.push(0);
      if (algo === 'clock') {
        ref_bits[cache.indexOf(page)] = 1;
      }
    }
    time_slice.push([...cache]);
  }

  return { time_slice, page_fault };
}