import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Transactions = ( {user} ) => {
    const columns = [
        { field: 'transId', headerName: 'Transaction ID', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 }
    ]
    
    const [rows, setRows] = React.useState(user.transactions)    

    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={row => row.transId}
        />
        </div>
    );
}

export default Transactions;