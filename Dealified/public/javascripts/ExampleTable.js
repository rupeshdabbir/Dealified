import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const items = [
]

const ExampleTableRow = (item) => (
  <TableRow key={item.id}>
    <TableRowColumn>{item.id}</TableRowColumn>
    <TableRowColumn>{item.name}</TableRowColumn>
    <TableRowColumn>{item.status}</TableRowColumn>
  </TableRow>
)

const ExampleTable = () => {
  const tableRows = items.map(item => ExampleTableRow(item));
  const settings = {
    multiSelectable: true,
    showRowHover: true,
    stripedRows: true
  }
  return (
    <div>
      <h1 className="page-title">Table</h1>
      <Table
        multiSelectable={settings.multiSelectable}
        showRowHover={settings.showRowHover}
        stripedRows={settings.stripedRows}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn >ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExampleTable;
