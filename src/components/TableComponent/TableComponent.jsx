import { Button, Table } from 'antd'
import React, { useRef, useState } from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }
    const tableRef = useRef(null);

    return (
        <LoadingComponent isLoading={isLoading}>
            {rowSelectedKeys.length > 0 && (
                <div style={{
                    background: '#1d1ddd',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer',
                }}
                    onClick={handleDeleteAll}
                >Xóa tất cả</div>
            )}
            <DownloadTableExcel
                filename="users table"
                sheet="users"
                data={data}
                currentTableRef={tableRef.current}
            >
                <Button> Export excel </Button>

            </DownloadTableExcel>

            <Table ref={tableRef}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </LoadingComponent>
    )
}

export default TableComponent