import {DataGrid} from '@mui/x-data-grid';

const DataTable = ({loading , rows , columns}) => {



    return (
        <DataGrid loading={loading} columns={columns} rows={rows} />
    )
}

export default DataTable;