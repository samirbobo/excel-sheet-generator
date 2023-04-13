let table = document.getElementsByClassName("sheet-body")[0],
  rows = document.getElementsByClassName("rows")[0],
  columns = document.getElementsByClassName("columns")[0];
tableExists = false;


function showSwal(text, state) {
  swal({
    title: `${text}`,
    icon: `${state}`,
  });
}

const generateTable = () => {
  let rowsNumber = parseInt(rows.value),
    columnsNumber = parseInt(columns.value);
  table.innerHTML = "";

  for (let i = 0; i < rowsNumber; i++) {
    var tableRow = "";
    for (let j = 0; j < columnsNumber; j++) {
      tableRow += `<td contenteditable></td>`;
    }
    table.innerHTML += tableRow;
  }

  if(isNaN(rowsNumber) && isNaN(columnsNumber)) {
    showSwal('Please enter the size table', 'error');
  }else if(isNaN(rowsNumber) || rowsNumber === 0) {
    showSwal('Please enter the number of table rows', 'error');
  }else if(isNaN(columnsNumber) || columnsNumber === 0) {
    showSwal('Please enter the number of table columns', 'error');
  }

  if (rowsNumber > 0 && columnsNumber > 0) {
    tableExists = true;
  }
};

const ExportToExcel = (type, fn, dl) => {
  if (!tableExists) {
    showSwal('Please enter the size table', 'error');
    return;
  }
  var elt = table;
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MyNewSheet." + (type || "xlsx"));
};