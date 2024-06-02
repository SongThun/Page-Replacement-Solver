function generateTable(reference, num_frames, time_slice, page_fault) {
  // initialize table
  let table = "<table class='table table-bordered'> <thead> <th>Ref</th>";

  // header for page references
  reference.forEach((ref) => {
    table += "<th>" + ref + "</th>";
  });
  table += "</thead>";
  // end header

  // body
  table += "<tbody>";
  // each row indicates each frame
  for (let i = 0; i < num_frames; i++) {
    table += "<tr> <td>fr</td>";
    for (let t = 0; t < time_slice.length; t++) {
      let className = "";
      if (time_slice[t][i] === reference[t]) {
        className = page_fault[t] ? 'table-danger' : 'table-success';
      }
      table += `<td class=${className}> ${time_slice[t][i] || ""} </td>`;
    }
    table += "</tr>";
  }
  // end frame

  // page fault 
  table += "<tr> <td>Hit</td>"
  page_fault.forEach((miss) => {
    if (miss) {
      table += "<td><i class='bx bx-x opacity-50'></i></td>";
    } else {
      table += "<td><i class='bx bx-check'></i></td>";
    }
  })
  table += "</tr>";
  // end page fault

  table += "</tbody>";
  // end body

  table += "</table>";
  // end table

  return table;
}

export function displayTable(reference, num_frames, time_slice, page_fault) {
  document.getElementById("result").classList.remove("visually-hidden");
  document.getElementById("result-container").innerHTML = generateTable(reference, num_frames, time_slice, page_fault);
}

export function displaySummary(summary_obj) {
  document.getElementById("summary").classList.remove("visually-hidden");
  for (const detail in summary_obj) {
    document.getElementById(`${detail}`).innerHTML = summary_obj[detail];
  }
}