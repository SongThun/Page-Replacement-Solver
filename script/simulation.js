import { pageReplacement } from "./pageReplacement.js"
import { displayTable, displaySummary } from "./displayResult.js"


function countDistinct(arr) {
  let distinct = new Set(arr);
  return distinct.size;
}

export function simulate(e) {
  e.preventDefault();
  const algorithm = document.getElementById("Algorithm").value;
  const ref_string = document.getElementById("ref-string").value.trim();
  const ref_error = document.getElementById("ref-error");
  const num_frames = document.getElementById("num-frames").value;

  if (ref_string === "") {
    ref_error.classList.remove("visually-hidden");
    return;
  } else {
    ref_error.classList.add("visually-hidden");
  }

  const ref_string_array = ref_string.split(/\s+/g);

  const { time_slice, page_fault } = pageReplacement(algorithm, ref_string_array, num_frames);

  displayTable(ref_string_array, num_frames, time_slice, page_fault);

  const number_of_miss = page_fault.reduce((acc, curr) => acc + curr, 0);

  let summary_ = {
    ref: ref_string_array.length,
    pages: countDistinct(ref_string_array),
    algorithm: algorithm.toUpperCase(),
    frames: num_frames,
    miss_rate: (number_of_miss / ref_string_array.length).toFixed(2),
    hit_rate: (1 - number_of_miss / ref_string_array.length).toFixed(2)
  }

  displaySummary(summary_);
}