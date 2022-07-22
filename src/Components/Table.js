import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { BsSearch } from 'react-icons/bs'
import {
    FaSortAlphaDown, FaSortAlphaDownAlt, FaArrowsAltV,
    FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight
} from 'react-icons/fa'


export default function SortingTable({ datas, COLUMNS }) {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => datas, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        state } = useTable({
            columns,
            data
        }, useGlobalFilter, useSortBy, usePagination)

    const { pageIndex, pageSize, globalFilter } = state
    return (<div className="cfs-box table-responsive p-0 text-center">
        <div className='py-4 position-relative'>
            <div className='position-absolute top-0 start-0 m-3'>
                <div className="form-check form-check-inline">
                    <select className="form-select" value={pageSize} onChange={e => setPageSize(e.target.value)}>
                        {[5, 10, 25].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='position-absolute top-0 end-0 m-3'>
                <div className="input-group">
                    <span className="input-group-text"><BsSearch /></span>
                    <input type="text" className="form-control" placeholder="search"
                        value={globalFilter || ''} onChange={e => setGlobalFilter(e.target.value)} />
                </div>
            </div>
        </div>
        <table {...getTableProps()}  style={{minWidth:'700px'}}
        className="table table-cfs table-striped table-hover border-cfs-primary-light mt-3">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(
                                [{ className: column.className },
                                column.getSortByToggleProps(),
                                ]
                            )}>
                                <div className='position-relative'>
                                    {column.render('Header')}
                                    <div className='position-absolute bottom-0 end-0'>
                                        {column.isSorted ? (column.isSortedDesc ?
                                            <FaSortAlphaDownAlt /> :
                                            <FaSortAlphaDown />) :
                                            <FaArrowsAltV />}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="table-group-divider">
                {page.map(row => {
                    prepareRow(row)
                    return <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                })}
            </tbody>
        </table>
        <div>
            <div className="btn-group mb-3" role="group" aria-label="Basic example">
                <button className="btn btn-outline-cfs-primary-dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FaAngleDoubleLeft />
                </button>
                <button className="btn btn-outline-cfs-primary-dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FaAngleLeft />
                </button>
                <button className="border border-cfs-primary border-start-0">
                    <span className="text-cfs-primary">
                        Page:{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </button>
                <button className="btn btn-outline-cfs-primary-dark" onClick={() => nextPage()} disabled={!canNextPage}>
                    <FaAngleRight />
                </button>
                <button className="btn btn-outline-cfs-primary-dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <FaAngleDoubleRight />
                </button>
            </div>
        </div>
    </div>)
}
